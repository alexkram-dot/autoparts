#!/usr/bin/env python3
"""Проставляет ?v=<хеш содержимого> всем локальным css/js в HTML.

Запускать после правки css/ или js/ — ссылки обновятся только у тех файлов,
которые реально изменились, поэтому браузер перекачает ровно их.
"""
import re, glob, hashlib, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)


def digest(path):
    return hashlib.md5(open(path, "rb").read()).hexdigest()[:8]


def stamp():
    ver = {}
    for f in glob.glob("css/*.css") + glob.glob("js/*.js"):
        ver[f] = digest(f)

    changed = []
    for page in glob.glob("*.html"):
        s = open(page, encoding="utf-8").read()
        orig = s

        def repl(m):
            attr, path = m.group(1), m.group(2)
            v = ver.get(path)
            return f'{attr}="{path}?v={v}"' if v else m.group(0)

        s = re.sub(r'(href|src)="(css/[^"?]+\.css|js/[^"?]+\.js)(?:\?v=[0-9a-f]+)?"', repl, s)
        if s != orig:
            open(page, "w", encoding="utf-8").write(s)
            changed.append(page)

    for f, v in sorted(ver.items()):
        print(f"  {f:<20} v={v}")
    print(f"\nобновлено страниц: {len(changed)}")


if __name__ == "__main__":
    stamp()
