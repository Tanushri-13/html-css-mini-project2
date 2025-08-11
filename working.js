let habits = [];

function addHabit() {
    const input = document.getElementById("habitname");
    const name = input.value.trim();
    if (name === "") return;

    let newHabit = {
        name: name,                  
        days: [false, false, false, false, false, false, false] 
    };
    habits.push(newHabit);
    input.value = "";
    renderHabits();
}

function updateOverallProgress() {
    const progressBar = document.getElementById("overallProgressBar");

    let totalDays = habits.length * 7;
    let completedDays = 0;

    habits.forEach(habit => {
        completedDays += habit.days.filter(day => day).length;
    });

    let percentage = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;

    progressBar.style.width = percentage + "%";
    progressBar.textContent = Math.round(percentage) + "%";
}

function renderHabits() {
    const tableBody = document.querySelector("#habittable tbody");
    tableBody.innerHTML = "";

    habits.forEach((habit, habitIndex) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = habit.name;
        row.appendChild(nameCell);

        // Creates a table cell and a checkbox.
        habit.days.forEach((done, dayIndex) => {
            const dayCell = document.createElement("td");
            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";
            checkbox.checked = done;

            checkbox.addEventListener("change", () => {
                habit.days[dayIndex] = checkbox.checked;
                updateOverallProgress(); 
            });

            dayCell.appendChild(checkbox);
            row.appendChild(dayCell);
        });

        tableBody.appendChild(row);
    });

    updateOverallProgress(); // ✅ update when table is first rendered
}

renderHabits();

