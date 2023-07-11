import eel
import csv
eel.init("userinterface")

studentFile = 'student.csv'

# This will read the file in the Student CSV


@eel.expose
def getAllStudent():
    students = []
    with open(studentFile, 'r') as file:
        csv_reader = csv.reader(file)
        next(csv_reader)
        for student in csv_reader:
            students.append(student)

        return students

# This will Append Students into the Student CSV


@eel.expose
def AddStudent(studentInfo):
    try:
        with open(studentFile, 'a', newline='') as file:
            csv_writer = csv.writer(file)
            csv_writer.writerow(studentInfo)
        return True
    except Exception as e:
        return False


@eel.expose
# Search for Student Using LRN
def SearchById(lrn):
    results = []
    with open(studentFile, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[0].lower().startswith(lrn.lower()):
                results.append(row)
    return results


@eel.expose
# Search for Student Using Name
def SearchByName(lrn):
    results = []
    with open(studentFile, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[1].lower().startswith(lrn.lower()):
                results.append(row)
    return results


# Check if the LRN is is already taken
@eel.expose
def IsUnique(lrn):
    with open(studentFile, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if str(row[0]) == str(lrn):
                return False
    return True


@eel.expose
def UpdateStudent(lrn, new_data):
    updated = False
    rows = []

    with open(studentFile, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[0] == lrn:
                row = new_data  # Update the row with new data
                updated = True

            rows.append(row)

    if updated:
        with open(studentFile, 'w', newline='') as file:
            csv_writer = csv.writer(file)
            # Write all the rows, including the updated one
            csv_writer.writerows(rows)

    return updated


@eel.expose
def DeleteStudent(lrn):
    deleted = False
    rows = []

    with open(studentFile, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[0] != lrn:
                rows.append(row)
            else:
                deleted = True

    with open(studentFile, 'w', newline='') as file:
        csv_writer = csv.writer(file)
        # Write all the rows except the one to be deleted
        csv_writer.writerows(rows)

    return deleted


@eel.expose
# Search for Student Using Name
def CourseSearchStudent(code):
    results = []
    with open(studentFile, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[7] == code:
                results.append(row)
    return results

coursesFile = 'courses.csv'
# This will get All the Courses


@eel.expose
def getAllSCourses():
    courses = []
    with open(coursesFile, 'r') as file:
        csv_reader = csv.reader(file)
        next(csv_reader)
        for student in csv_reader:
            courses.append(student)

        return courses


@eel.expose
# Search for Student Using LRN
def GetSpecificCourse(id):
    result = ''
    with open(coursesFile, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[0] == id:
                result = row
    return result


@eel.expose
# Search for Courses Using id
def UpdateCourse(id, new_data):
    updated = False
    rows = []

    with open(coursesFile, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[0] == id:
                row = new_data  # Update the row with new data
                updated = True
            rows.append(row)

    if updated:
        with open(coursesFile, 'w', newline='') as file:
            csv_writer = csv.writer(file)
            # Write all the rows, including the updated one
            csv_writer.writerows(rows)

    return updated

# This will delete the Course using id


@eel.expose
def DeleteCourse(id):
    deleted = False
    rows = []

    with open(coursesFile, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[0] != id:
                rows.append(row)
            else:
                deleted = True

    with open(coursesFile, 'w', newline='') as file:
        csv_writer = csv.writer(file)
        # Write all the rows except the one to be deleted
        csv_writer.writerows(rows)

    return deleted


@eel.expose
# Search for Student Using LRN
def SearchByCode(code):
    results = []
    with open(coursesFile, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[1].lower().startswith(code.lower()):
                results.append(row)
    return results


@eel.expose
def IsUniqueId(id):
    with open(coursesFile, 'r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if str(row[1]) == str(id):
                return False
    return True

# This will Append Course into the Courses CSV


@eel.expose
def AddCourses(coursesInfo):
    try:
        with open(coursesFile, 'a', newline='') as file:
            csv_writer = csv.writer(file)
            csv_writer.writerow(coursesInfo)
        return True
    except Exception as e:
        return False


eel.start("student.html")
