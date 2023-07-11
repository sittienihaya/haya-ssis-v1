//Container for Courses Display
const courseContainer = document.getElementById('courses-container')

async function getAllCourses(){
    const courses = await eel.getAllSCourses()()
    for(let i=0; i<courses.length; i++){
        DisplayCourses(courses[i])
    }
}



//Listener for AddCourse
document.getElementById('addForm').addEventListener('submit', async function (e){
    e.preventDefault()
    let isUnique = false
    const code = document.getElementById('add-code').value
    const course = document.getElementById('add-course').value
        const id= generateRandomCode()   
        const unqid = await eel.SearchByCode(code)()
        console.log(unqid)
        if(unqid.length>0){
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Course Code Alreaady Exists',
                showConfirmButton: false,
                timer: 1500
              })
    }else{
        isUnique = true
            Add([id, code, course])
    }
    
})

async function Add(courseInfo){
    const IsAdded = await eel.AddCourses(courseInfo)
    if(IsAdded){
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Student updated successfully',
            showConfirmButton: false,
            timer: 1500
          })
        Hide('addModal')
        DisplayCourses(courseInfo)
    }
}

//Listener for Searces 
document.getElementById('searchform').addEventListener('submit', (e)=>{
    e.preventDefault()
    const container = document.getElementById('resultscontainer')
    const value = document.getElementById('searchinput').value
    container.innerHTML = ''
    Show('searchModal')
    Hide('editModal')
    getResults(value)
})

async function getResults(searchValue){
    const results = await eel.SearchByCode(searchValue)()
    const container = document.getElementById('resultscontainer')
    container.innerHTML =""
    if(results.length > 0){
        for(let i = 0; i < results.length; i++){
            const div = document.createElement('div')
            div.classList.add('w-full','border-b-2', 'border-rose-700',  'p-4', 'cursor-pointer', 'hover:translate-x-5', 'hover:bg-rose-100','hover:text-rose-600' ,'duration-500', 'h-fit','w-full','bg-transparent', 'flex','justify-between') 
            div.id = `${results[i][0]}-div` // Id of each row
            div.addEventListener('click', function(){
                Show('editModal')
                PutValues(results[i][0])
                Hide('searchModal')
            })
            div.innerHTML =`
                <p class="text-base font-semibold col-auto">${results[i][1]}</p>
                <p class="text-base font-semibold col-auto">${results[i][2]}</p>
            `
            container.appendChild(div)
        }
    }else{
        const div = document.createElement('div')
        div.classList.add('text-base','font-semibold','col-auto','text-center','flex', 'flex-row','w-full','justify-center')
        div.innerText = 'No results found'
        container.appendChild(div)
    }
}


//Listerner if Edit form is submitted
document.getElementById('editForm').addEventListener('submit',async (e)=>{
    e.preventDefault()
    const codeInput = document.getElementById('edit-code').value
    const isUnique = await eel.IsUniqueId(codeInput)()
    const courseInput = document.getElementById('edit-course').value
    const idinput = document.getElementById('edit-id').value
    if(!isUnique){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Course Code Alreaady Exists',
            showConfirmButton: false,
            timer: 1500
          })
    }else{
        updateCourse([idinput,codeInput,courseInput])
    }
})


//Will update the Course
async function updateCourse(courseInfo){
    const courses = await eel.GetSpecificCourse(courseInfo[0])()
    const isUpdated = await eel.UpdateCourse(courseInfo[0],courseInfo)()
    if(isUpdated){
        const UpdateStudentCourse = await eel.CourseSearchStudent(courses[1])()
        console.log(courses)
        console.log(UpdateStudentCourse)
        for(let i = 0; i < UpdateStudentCourse.length; i++){
            eel.UpdateStudent(UpdateStudentCourse[i][0], [UpdateStudentCourse[i][0],UpdateStudentCourse[i][1],UpdateStudentCourse[i][2],UpdateStudentCourse[i][3],UpdateStudentCourse[i][4],UpdateStudentCourse[i][5],UpdateStudentCourse[i][6],courseInfo[1]])
          }
        console.table(UpdateStudentCourse)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Student updated successfully',
            showConfirmButton: false,
            timer: 1500
          })
          Hide("editModal")
          const course = document.getElementById(`${courseInfo[0]}-course`)
          const code = document.getElementById(`${courseInfo[0]}-code`)
          code.innerHTML = courseInfo[1]
          course.innerHTML = courseInfo[2]
    }else{
    }
}


//Will Put Updated Values into the Course Input
async function PutValues(id){
    const course = await eel.GetSpecificCourse(id)()
    const codeInput = document.getElementById('edit-code')
    const courseInput = document.getElementById('edit-course')
    const idinput = document.getElementById('edit-id')
    idinput.value = course[0]
    codeInput.value = course[1]
    courseInput.value = course[2]
}

// This will display all the courses
async function DisplayCourses(course){
    const numOfStudentEnrolled = await eel.CourseSearchStudent(course[1])()
    const div = document.createElement('div')
    div.addEventListener('click',()=>{
        Show('editModal')
        PutValues(course[0])
    })
    div.id = `${course[0]}-div`
    div.classList.add('cursor-pointer', 'w-full', 'h-28', 'text-center', 'rounded-md', 'bg-rose-200', 'col-span-1', 'px-2', 'py-10', 'hover:bg-rose-300', 'duration-300', 'shadow-fuchsia-300', 'shadow-2xl')
    div.innerHTML =`
        <p class="text-medium font-semibold text-black truncate " id="${course[0]}-course">${course[2]}</p>
        <p class="text-sm font-bold truncate" id="${course[0]}-code">(${course[1]})</p>
        <div class="w-full h-fit py-2 flex justify-end">
            <p class="text-xs font-semibold truncate">Student Enrolled: <span class="text-rose-800" id="stud-num">${numOfStudentEnrolled.length}</span></p>
        </div>
    `
    courseContainer.appendChild(div)

}

//This will Delete the course if there is one enrolled
async function deleteCourse(){
    const idinput = document.getElementById('edit-id').value
    const courseInfo = await eel.GetSpecificCourse(idinput)()
    console.log(courseInfo)
    const numOfStudentEnrolled = await eel.CourseSearchStudent(courseInfo[1])()
    console.log(numOfStudentEnrolled.length)
    if(numOfStudentEnrolled.length > 0){
        Swal.fire({
            title: 'Error!',
            text: "This course cannot be deleted because there are students enrolled in it.",
            icon: 'error',
            confirmButtonText: 'Okay'
          })
    }else{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Hide(`${courseInfo[0]}-div`)
              Delete(courseInfo[0])
              Hide(`editModal`)
            }
          })
    }
}

//Delete 
async function Delete(id){
    console.log(id)
    const isDeleted = await eel.DeleteCourse(id)()
    if(isDeleted){
        Swal.fire(
            'Deleted!',
            'Course has been deleted.',
            'success'
          )
    }
}

// Show ELement
function Show(id){

    document.getElementById(id).classList.remove("hidden");
}
// Hide ELement
function Hide(id){
    document.getElementById(id).classList.add("hidden");
}

//This will generate random number for the id 
function generateRandomCode() {
    // Generate a random number between 0 and 9999 (inclusive)
    var randomNumber = Math.floor(Math.random() * 10000);
  
    // Pad the random number with zeros to ensure it has 4 digits
    var paddedNumber = String(randomNumber).padStart(4, '0');
  
    return paddedNumber;
  }

window.addEventListener("load", (event) => {
    getAllCourses()
  });




