#!/usr/bin/env python3
import os
import re
from pathlib import Path

def update_html_file(filepath):
    """Update links and section numbers in HTML file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    updates_made = []
    
    # Pattern 1: Update directory links in href
    # ../01-basics/ -> ../1-basics/
    pattern1 = re.compile(r'href="(\.\./)?0(\d)-([\w-]+)/')
    matches = pattern1.findall(content)
    if matches:
        content = pattern1.sub(r'href="\g<1>\2-\3/', content)
        updates_made.append(f"Updated directory links: {len(matches)} occurrences")
    
    # Pattern 1b: Update subdirectory links in href
    # ../2-compliance/03-baa-hipaa/ -> ../2-compliance/2.3-baa-hipaa/
    # ../3-security/04-security-audit/ -> ../3-security/3.4-security-audit/
    # ../4-implementation/03-troubleshooting/ -> ../4-implementation/4.3-troubleshooting/
    # ../4-implementation/04-operations-management/ -> ../4-implementation/4.4-operations-management/
    subdirectory_pattern = re.compile(r'href="([\w-]+/)0(\d)-([\w-]+)/')
    
    def replace_subdirectory(match):
        prefix = match.group(1)
        number = match.group(2)
        name = match.group(3)
        
        # Determine the main section number from the prefix
        if prefix.startswith('../2-compliance/'):
            return f'href="{prefix}2.{number}-{name}/'
        elif prefix.startswith('../3-security/'):
            return f'href="{prefix}3.{number}-{name}/'
        elif prefix.startswith('../4-implementation/'):
            return f'href="{prefix}4.{number}-{name}/'
        else:
            return match.group(0)  # Return unchanged if not recognized
    
    original_count = len(subdirectory_pattern.findall(content))
    if original_count > 0:
        content = subdirectory_pattern.sub(replace_subdirectory, content)
        updates_made.append(f"Updated subdirectory links: {original_count} occurrences")
    
    # Pattern 2: Update file links with old numbering
    # 01-what-is-llm.html -> 1.1-what-is-llm.html
    # Map old names to new names
    file_mappings = {
        '01-what-is-llm.html': '1.1-what-is-llm.html',
        '02-what-is-api.html': '1.2-what-is-api.html',
        '03-medical-considerations.html': '1.3-medical-considerations.html',
        '01-japanese-regulations.html': '2.1-japanese-regulations.html',
        '02-openai-privacy.html': '2.2-openai-privacy.html',
        '03-baa-hipaa.html': '2.3-baa-hipaa.html',
        '01-basics.html': '2.3.1-basics.html',
        '02-zdr.html': '2.3.2-zdr.html',
        '03-implementation.html': '2.3.3-implementation.html',
        '04-decision-guide.html': '2.3.4-decision-guide.html',
        '01-security-overview.html': '3.1-security-overview.html',
        '02-patient-data-protection.html': '3.2-patient-data-protection.html',
        '03-api-key-security.html': '3.3-api-key-security.html',
        '01-overview-daily.html': '3.4.1-overview-daily.html',
        '02-audit-items-tools.html': '3.4.2-audit-items-tools.html',
        '03-audit-response-improvement.html': '3.4.3-audit-response-improvement.html',
        '04-documentation-training.html': '3.4.4-documentation-training.html',
        '01-api-key-setup.html': '4.1-api-key-setup.html',
        '02-practical-usage.html': '4.2-practical-usage.html',
        '01-emergency-technical.html': '4.3.1-emergency-technical.html',
        '02-application-cost.html': '4.3.2-application-cost.html',
        '03-maintenance-escalation.html': '4.3.3-maintenance-escalation.html',
        '04-tools-improvement.html': '4.3.4-tools-improvement.html',
        '01-daily-operations.html': '4.4.1-daily-operations.html',
        '02-user-cost-management.html': '4.4.2-user-cost-management.html',
        '03-analysis-improvement.html': '4.4.3-analysis-improvement.html',
        '04-documentation-emergency.html': '4.4.4-documentation-emergency.html',
        '01-quick-reference.html': '5.1-quick-reference.html',
        '02-executive-summary.html': '5.2-executive-summary.html',
        '01-overview.html': '6.1-overview.html',
        '02-advanced.html': '6.2-advanced.html',
        '03-evaluation.html': '6.3-evaluation.html',
        '04-management.html': '6.4-management.html',
        '02-assessment-tests.html': '6.2-assessment-tests.html',
        '01-monthly-reports.html': '7.1-monthly-reports.html',
        '02-training-effectiveness.html': '7.2-training-effectiveness.html'
    }
    
    for old_name, new_name in file_mappings.items():
        if old_name in content:
            count = content.count(old_name)
            content = content.replace(old_name, new_name)
            updates_made.append(f"Updated {old_name} -> {new_name}: {count} occurrences")
    
    # Pattern 3: Update section headers
    # 01. -> 1., 02. -> 2., etc.
    pattern3 = re.compile(r'<h4>[\w️⚖🛡🔧📋🎓📊\s]+0(\d)\.')
    matches = pattern3.findall(content)
    if matches:
        content = re.sub(r'(<h4>[\w️⚖🛡🔧📋🎓📊\s]+)0(\d)\.', r'\g<1>\2.', content)
        updates_made.append(f"Updated section headers: {len(matches)} occurrences")
    
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
        updated, changes = update_html_file(filepath)
        
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