#!/usr/bin/env python3

import click
import os
import sys


def read():
    for name in sys.stdin:
        name = name.rstrip()
        old_name = name

        yield old_name, name.lower().replace('_', '-')


@click.command()
@click.option('--dry-run/--no-dry-run', is_flag=True, default=True)
def main(dry_run):
    for old_name, name in read():
        print(old_name, '->', name)
        if dry_run:
            continue
        os.rename(old_name, name)


if __name__ == '__main__':
    main()
