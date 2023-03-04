
def compare_skills(given, proposed):
    number = 0
    for skill in proposed:
        number += 1 if skill in given else 0
    return number

def compare_name(given, propose):
    pass