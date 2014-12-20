(ns cv
  "My cv as pure data. After all, everything is data!"
  (:require [clojure
             [string :as s]
             [pprint :as p]]))

(def my-cv
  {:identity     {:name        "Dumont"
                  :first-name  "Antoine"
                  :middle-name "Romain"
                  :birth       "N/A"
                  :location    "N/A"
                  :city        "N/A"
                  :country     "France"
                  :phone       "N/A"
                  :emails      "N/A"}

   :jobs         {:current     :sfeir
                  :sfeir       {:as     "software engineer/developer/devops"
                                :period "2011 - now"}
                  :sopra-group {:as     "software engineer"
                                :period "2007-2011"}}

   :experience   :contact-me-for-that

   :technologies {:languages                ["clojure" "haskell" "ruby" "*sh" "c" "php" "*sql" "xhtml" "java" "etc..."]
                  :other-languages          ["emacs-lisp" "common-lisp" "clojurescript" "objective-c" "arduino programming language"]
                  :dvcs                     ["git"]
                  :tools                    ["GNU/Linux" "emacs" "leiningen" "eclipse" "maven" "ant" "Makefile" "*sh"]
                  :configuration-management ["puppet"]
                  :nosql-databases          ["hadoop" "datomic"]
                  :sql-databases            ["mysql" "postgresql" "oracle"]}

   :profiles     {:github            "https://github.com/ardumont"
                  :twitter           "http://twitter.com/@ardumont"
                  :gravatar          "http://en.gravatar.com/ardumont"
                  :linkedin          "http://www.linkedin.com/pub/antoine-romain-dumont/5/158/655"
                  :viadeo            "http://www.viadeo.com/fr/profile/antoine-romain.dumont"
                  :facebook          "https://www.facebook.com/profile.php?id=642018541"}

   :projects     {:go-see-github     "https://github.com/ardumont"
                  :my-blog           "http://adumont.fr/blog"
                  :4-clojure         "http://www.4clojure.com/user/ardumont"
                  :project-euler     "http://projecteuler.net/profile/ardumont.png"
                  :clojure-paris-ug  "https://groups.google.com/forum/?fromgroups#!forum/clojure-paris-user-group"
                  :projectsion       "http://projectsion.sourceforge.net/"}

   :specifics    ["father of 2" "geek and proud of it" "linuxian" "clojurian" "emacs user" "free software" "simplicity matters"]

   :hobby        ["clojure" "coding" "reading" "running" "roller" "guitar" "drum"]})


(get-in my-cv [:identity :phone])
(get-in my-cv [:identity :emails])
(get-in my-cv [:profiles :github])
(p/pprint (get-in my-cv [:jobs]))
