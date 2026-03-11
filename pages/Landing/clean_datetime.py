import sys

def main():
    file_path = r'd:\Figma\Ssrn\pages\Landing\landing-page-anonymous.html'
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    css_s, css_e = -1, -1
    html_s, html_e = -1, -1
    js_s, js_e = -1, -1

    for i, line in enumerate(lines):
        if 'DATETIME PICKER OVERLAY' in line:
            css_s = i - 1
        if 'Hide mobile nav menu on desktop only' in line:
            css_e = i - 1
        if 'Calendar/Time Picker Overlay' in line:
            html_s = i - 1
        if '<!-- Hero Section -->' in line:
            html_e = i - 1
        if 'Datetime Picker' in line and '// ' in line:
            js_s = i - 1
        if 'Booking Form Tab Switching' in line and '// ' in line:
            js_e = i - 1

    print(f'Indices found: css({css_s},{css_e}), html({html_s},{html_e}), js({js_s},{js_e})')

    if all(x != -1 for x in [css_s, css_e, html_s, html_e, js_s, js_e]):
        new_lines = lines[:css_s] + lines[css_e:html_s] + lines[html_e:js_s] + lines[js_e:]
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print('Successfully replaced lines in HTML file!')
    else:
        print('Could not find all indices.')

if __name__ == '__main__':
    main()
