#!/usr/bin/env python3
import os
import re
from pathlib import Path

def fix_remaining_links(filepath):
    """Fix remaining subdirectory link patterns"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    updates_made = []
    
    # Fix specific remaining patterns
    replacements = [
        (r'href="([^"]*/)03-baa-hipaa/', r'href="\g<1>2.3-baa-hipaa/'),
        (r'href="([^"]*/)04-security-audit/', r'href="\g<1>3.4-security-audit/'),
        (r'href="([^"]*/)03-troubleshooting/', r'href="\g<1>4.3-troubleshooting/'),
        (r'href="([^"]*/)04-operations-management/', r'href="\g<1>4.4-operations-management/'),
        # Also fix any links that end with these directories without trailing slash
        (r'href="([^"]*/)03-baa-hipaa"', r'href="\g<1>2.3-baa-hipaa"'),
        (r'href="([^"]*/)04-security-audit"', r'href="\g<1>3.4-security-audit"'),
        (r'href="([^"]*/)03-troubleshooting"', r'href="\g<1>4.3-troubleshooting"'),
        (r'href="([^"]*/)04-operations-management"', r'href="\g<1>4.4-operations-management"'),
        # Fix any remaining without directory extension
        (r'href="([^"]*/)04-operations-management\.html"', r'href="\g<1>4.4-operations-management.html"'),
        (r'href="([^"]*/)04-security-audit\.html"', r'href="\g<1>3.4-security-audit.html"'),
    ]
    
    for pattern, replacement in replacements:
        count = len(re.findall(pattern, content))
        if count > 0:
            content = re.sub(pattern, replacement, content)
            updates_made.append(f"Fixed {pattern}: {count} occurrences")
    
    # Write back if changes were made
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, updates_made
    
    return False, []

def main():
    docs_dir = Path('/Users/hirokitakamura/Documents/Dev/2025-06-23APIkeyManual/docs')
    updated_files = 0
    total_files = 0
    
    # Find all HTML files
    html_files = []
    for root, dirs, files in os.walk(docs_dir):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    print(f"Found {len(html_files)} HTML files to process\n")
    
    for filepath in sorted(html_files):
        total_files += 1
        updated, changes = fix_remaining_links(filepath)
        
        if updated:
            updated_files += 1
            rel_path = os.path.relpath(filepath, docs_dir)
            print(f"✅ Updated: {rel_path}")
            for change in changes:
                print(f"   - {change}")
            print()
    
    print(f"\n📊 Summary:")
    print(f"   Total files processed: {total_files}")
    print(f"   Files updated: {updated_files}")
    print(f"   Files unchanged: {total_files - updated_files}")

if __name__ == "__main__":
    main()