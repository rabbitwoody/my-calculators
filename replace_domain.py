"""
Скрипт заміни домену та назви бренду у всіх файлах сайту.

Як використовувати:
1. Поклади цей файл в корінь папки calchub/
2. Відкрий термінал в цій папці
3. Запусти: python replace_domain.py
"""

import os

# ============================================================
# НАЛАШТУВАННЯ — змінюй тільки тут
# ============================================================
OLD_DOMAIN  = 'calchub.com'
NEW_DOMAIN  = 'calc-space.online'

OLD_BRAND   = 'CalcHub'
NEW_BRAND   = 'CalcSpace'

# Які розширення файлів обробляти
EXTENSIONS  = ('.html', '.xml', '.txt', '.css', '.js')
# ============================================================

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception:
        return False

    new_content = content
    new_content = new_content.replace(OLD_DOMAIN, NEW_DOMAIN)
    new_content = new_content.replace(OLD_BRAND,  NEW_BRAND)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    root = os.path.dirname(os.path.abspath(__file__))
    changed = []

    for dirpath, dirnames, filenames in os.walk(root):
        # Пропускаємо прихований .git
        dirnames[:] = [d for d in dirnames if d != '.git']

        for filename in filenames:
            if filename.endswith(EXTENSIONS):
                filepath = os.path.join(dirpath, filename)
                if replace_in_file(filepath):
                    changed.append(filepath.replace(root, ''))

    print(f"\n✅ Замінено у {len(changed)} файлах:\n")
    for f in changed:
        print(f"  {f}")
    print(f"\nСтаре: {OLD_DOMAIN} / {OLD_BRAND}")
    print(f"Нове:  {NEW_DOMAIN} / {NEW_BRAND}")

if __name__ == '__main__':
    main()
