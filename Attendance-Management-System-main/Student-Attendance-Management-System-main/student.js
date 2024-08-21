document.getElementById("form1").addEventListener("submit", submitFun1);

var studentDataArr = JSON.parse(localStorage.getItem("studentData")) || [];

function submitFun1(e) {
    document.querySelector("#tbody").innerHTML = "";
    e.preventDefault();
    var name = document.querySelector("#name").value;
    var number = document.querySelector("#number").value;
    var city = document.querySelector("#city").value;
    var rollNo = document.querySelector("#rollNo").value;

    var studentObj = {
        name: name,
        number: number,
        city: city,
        rollNo: rollNo,
        attendance: ""  // Initialize attendance status
    };

    studentDataArr.push(studentObj);
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    document.querySelector("#form1").reset();
    alert("Student Added Successfully");

    displayFun(studentDataArr);
}

function displayFun(studentDataArr) {
    var count = 1;
    studentDataArr.forEach(function (item, index) {
        var tr = document.createElement("tr");

        var td1 = document.createElement("td");
        td1.innerHTML = count++;
        var td2 = document.createElement("td");
        td2.innerHTML = item.name;
        var td3 = document.createElement("td");
        td3.innerHTML = item.number;
        var td4 = document.createElement("td");
        td4.innerHTML = item.city;
        var td5 = document.createElement("td");
        td5.innerHTML = item.rollNo;
        var td6 = document.createElement("td");
        td6.innerHTML = item.attendance; // Display the current attendance status
        var btn1 = document.createElement("button");
        btn1.innerHTML = "P";
        btn1.addEventListener("click", function () {
            updateAttendance(index, "Present");
        });
        var btn2 = document.createElement("button");
        btn2.innerHTML = "A";
        btn2.addEventListener("click", function () {
            updateAttendance(index, "Absent");
        });
        var td7 = document.createElement("td");
        var deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener("click", function () {
            deleteStudent(index);
        });

        td6.classList.add("td6");
        td6.append(btn1, btn2);
        td7.append(deleteBtn);

        tr.append(td1, td2, td3, td4, td5, td6, td7);

        document.querySelector("#tbody").append(tr);
    });
}

function updateAttendance(index, status) {
    studentDataArr[index].attendance = status;
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    displayFun(studentDataArr);
}

function deleteStudent(index) {
    studentDataArr.splice(index, 1);
    localStorage.setItem("studentData", JSON.stringify(studentDataArr));
    displayFun(studentDataArr);
}

displayFun(studentDataArr);
