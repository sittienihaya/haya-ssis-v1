# importing the eel library
import eel
import csv

# initializing the application
eel.init("ui")

file = "studentsinfo.csv"


@eel.expose
def read_studentcsv():
    data = []
    with open("studentsinfo.csv", "r") as file:
        csv_reader = csv.reader(file)
        next(csv_reader)
        for row in csv_reader:
            data.append(row)
    return data


@eel.expose
def add_row_to_csv(new_data):
    with open("studentsinfo.csv", "a", newline="") as file:
        csv_writer = csv.writer(file)
        csv_writer.writerow(new_data)


@eel.expose
def update_student_by_id(lrn_to_update, new_data):
    rows = []
    print(new_data)
    with open("studentsinfo.csv", "r") as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if str(row[0]) == str(lrn_to_update):  # Assuming the ID is in the first column
                row = new_data  # Update the row with the new data
            rows.append(row)

    with open("studentsinfo.csv", "w", newline="") as file:
        csv_writer = csv.writer(file)
        csv_writer.writerows(rows)

@eel.expose 
def get_stud_info(lrn_to_get):
     rows = []
     with open("studentsinfo.csv", "r") as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if str(row[0]) == str(lrn_to_get):  # Assuming the ID is in the first column
                rows.append(row)
     return rows

@eel.expose
def delete_stud_in_csv( id_to_delete):
    lines = []
    with open('studentsinfo.csv', "r") as file:
        for line in file:
            if not line.startswith(str(id_to_delete) + ","):
                lines.append(line)

    with open('studentsinfo.csv', "w") as file:
        file.writelines(lines)



def search_row_by_id(id_to_search):
    rows = []

    with open("studentsinfo.csv", "r") as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[0] == id_to_search:  # Assuming the lrn is in the first column
                rows.append(row)
    return rows


@eel.expose
def get_items_starting_from_lrn(start_value):
    items = []
    with open("studentsinfo.csv", "r") as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[0].startswith(
                start_value
            ):  # Assuming the LRN is in the first column
                items.append(row)
    return items


@eel.expose
def get_items_starting_from_name(start_value):
    items = []
    with open("studentsinfo.csv", "r") as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            if row[1].upper().startswith(
                start_value
            ):  # Assuming the name is in the first column
                items.append(row)
    return items


eel.start("index.html")
