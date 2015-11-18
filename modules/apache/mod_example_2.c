/* Include the required headers from httpd */
#include "httpd.h"
#include "http_core.h"
#include "http_protocol.h"
#include "http_request.h"

#include "apr_strings.h"
#include "apr_network_io.h"
#include "apr_md5.h"
#include "apr_sha1.h"
#include "apr_hash.h"
#include "apr_base64.h"
#include "apr_dbd.h"
#include <apr_file_info.h>
#include <apr_file_io.h>
#include <apr_tables.h>
#include "util_script.h"

/* Define prototypes of our functions in this module */
static void register_hooks(apr_pool_t *pool);
static int example_handler(request_rec *r);

/* Define our module as an entity and assign a function for registering hooks  */

module AP_MODULE_DECLARE_DATA   example_module =
{
    STANDARD20_MODULE_STUFF,
    NULL,            // Per-directory configuration handler
    NULL,            // Merge handler for per-directory configurations
    NULL,            // Per-server configuration handler
    NULL,            // Merge handler for per-server configurations
    NULL,            // Any directives we may have for httpd
    register_hooks   // Our hook registering function
};


/* register_hooks: Adds a hook to the httpd process */
static void register_hooks(apr_pool_t *pool) 
{
    
    /* Hook the request handler */
    ap_hook_handler(example_handler, NULL, NULL, APR_HOOK_LAST);
}

/* The handler function for our module.
 * This is where all the fun happens!
 */

apr_table_t* example_parse_args(request_rec* r) {
    
    apr_table_t* GET;
    apr_array_header_t* POST;
    
    ap_args_to_table(r, &GET);
    ap_parse_form_data(r, NULL, &POST, -1, 8192);
}

const char* example_get_value(apr_table_t* table, const char* key) 
{
    const apr_array_header_t    *fields;
    int                         i;
    //apr_table_elts
    
}

static int example_handler(request_rec *r)
{
    int rc, exists;
    apr_finfo_t finfo;
    apr_file_t* file;
    char *filename;
    char buffer[512];
    apr_size_t readBytes;
    int n;
    apr_table_t* GET;
    apr_array_header_t* POST;
    const char* digestType;
    
    
    // Check that the "example-handler" handler is being called.
    if (!r->handler || strcmp(r->handler, "example-handler")) return (DECLINED);
    
    // Figure out which file is being requested by removing the .sum from it
    filename = apr_pstrdup(r->pool, r->filename);
    filename[strlen(filename)-4] = 0; // Cut off the last 4 characters.
    
    // Figure out if the file we request a sum on exists and isn't a directory
    rc = apr_stat(&finfo, filename, APR_FINFO_MIN, r->pool);
    if (rc == APR_SUCCESS) {
        exists =
        (
            (finfo.filetype != APR_NOFILE)
        &&  !(finfo.filetype & APR_DIR)
        );
        if (!exists) return HTTP_NOT_FOUND; // Return a 404 if not found.
    }
    // If apr_stat failed, we're probably not allowed to check this file.
    else return HTTP_FORBIDDEN;
    
    // Parse the GET and, optionally, the POST data sent to us
    
    ap_args_to_table(r, &GET);
    ap_parse_form_data(r, NULL, &POST, -1, 8192);
    
    // Set the appropriate content type
    ap_set_content_type(r, "text/html");
    
    // Print a title and some general information
    ap_rprintf(r, "<h2>Information on %s:</h2>", filename);
    ap_rprintf(r, "<b>Size:</b> %u bytes<br/>", finfo.size);
    
    // Get the digest type the client wants to see
    digestType = apr_table_get(GET, "digest");
    if (!digestType) digestType = "MD5";
    
    rc = apr_file_open(&file, filename, APR_READ, APR_OS_DEFAULT, r->pool);
    if (rc == APR_SUCCESS) {
        
        // Are we trying to calculate the MD5 or the SHA1 digest?
        if (!strcasecmp(digestType, "md5")) {
            // Calculate the MD5 sum of the file
            union {
                char      chr[16];
                uint32_t  num[4];
            } digest;
            apr_md5_ctx_t md5;
            apr_md5_init(&md5);
            readBytes = 256;
            while ( apr_file_read(file, buffer, &readBytes) == APR_SUCCESS ) {
                apr_md5_update(&md5, buffer, readBytes);
            }
            apr_md5_final(digest.chr, &md5);
            
            // Print out the MD5 digest
            ap_rputs("<b>MD5: </b><code>", r);
            for (n = 0; n < APR_MD5_DIGESTSIZE/4; n++) {
                ap_rprintf(r, "%08x", digest.num[n]);
            }
            ap_rputs("</code>", r);
            // Print a link to the SHA1 version
            ap_rputs("<br/><a href='?digest=sha1'>View the SHA1 hash instead</a>", r);
        }
        else {
            // Calculate the SHA1 sum of the file
            union {
                char      chr[20];
                uint32_t  num[5];
            } digest;
            apr_sha1_ctx_t sha1;
            apr_sha1_init(&sha1);
            readBytes = 256;
            while ( apr_file_read(file, buffer, &readBytes) == APR_SUCCESS ) {
                apr_sha1_update(&sha1, buffer, readBytes);
            }
            apr_sha1_final(digest.chr, &sha1);
            
            // Print out the SHA1 digest
            ap_rputs("<b>SHA1: </b><code>", r);
            for (n = 0; n < APR_SHA1_DIGESTSIZE/4; n++) {
                ap_rprintf(r, "%08x", digest.num[n]);
            }
            ap_rputs("</code>", r);
            
            // Print a link to the MD5 version
            ap_rputs("<br/><a href='?digest=md5'>View the MD5 hash instead</a>", r);
        }
        apr_file_close(file);
        
    }
    
    
    
    // Let Apache know that we responded to this request.
    return OK;
}