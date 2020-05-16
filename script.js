document.addEventListener('DOMContentLoaded', function () {
    let arr = JSON.parse(localStorage.getItem('usersList')) || [];
    let click = -1;
    class Task {
        constructor(view) {
            this.view = view;
        }
        addLocation () {
            const location = document.getElementById('adres');
            location.innerText = `My adres is ${document.getElementById('location').value}`;
        }
        addTaskList (element){
            const taskName = document.getElementById('taskName');
            taskName.innerHTML = `${element.toUpperCase()} TASKS`;
        }
        addTaskText (el){
            const taskText = document.querySelector('.taskText');
            taskText.innerHTML = `I need a ${el.id.toLowerCase()} to ${el.innerText.toLowerCase()}`;
        }
        addDescription (){
            const textDescription = document.getElementById('textDescription');
            textDescription.innerHTML = `, ${document.getElementById('description').value}`;
        }
    }
    class ControllerToCreate {
        constructor(task) {
            this.task = task;
        }
        location (){
            task.addLocation();
        }
        taskList (e){
            e.preventDefault();
            let element = e.target.innerText;
            task.addTaskList(element);
        }
        taskTxt (e){
            e.preventDefault();
            let el = e.target;
            task.addTaskText(el);
        }
        description (){
            task.addDescription();
        }
    }
    class CreateEditDelete {
        constructor(show) {
            this.show = show;
        }
        createTask (){
            task1.counter();
            let obj = {
                service: document.querySelector('.taskText').innerText,
                location: document.getElementById('location').value,
                description: document.getElementById('description').value
            }
            arr.push(obj);
            localStorage.setItem('usersList', JSON.stringify(arr));
            console.log(JSON.stringify(arr));
        }
        counter (){
            (function onclick (){
                click ++;
            })();
            document.querySelector('.taskText').id = click;
        }
        delTask (el){
            arr.splice(el.id, 1);
            document.getElementById(el.id).remove();
        }
        editTask (el){
            console.log(el);
            let user = {
                service: document.querySelector('.taskText').innerText,
                location: document.getElementById('location').value,
                description: document.getElementById('description').value
            };
            arr.splice(el, 1, user);
            const taskDisplay = document.getElementById(`taskDisplay${el}`);
            taskDisplay.innerHTML = `${document.querySelector('.taskText').innerText}`;
            localStorage.setItem('usersList', JSON.stringify(arr));
            console.log(JSON.stringify(arr));
        }
    }
    class ControllerUpdate {
        constructor(task1) {
            this.task1 = task1;
        }
        addNewTask (){
            task1.createTask();
        }
        delTask (e){
            let el = e.target;
            task1.delTask(el);
        }
        addUpdated (e){
            let el = e.target.id;
            task1.editTask(el);
        }
    }
    class View {
        firstPage (){
            const header = document.querySelector('header');
            const topMenu = document.createElement('div');
            const profile = document.createElement('div');
            header.appendChild(topMenu);
            header.appendChild(profile);
            topMenu.innerHTML = '<span class="jobUp headMenu">JobUp</span><span class="dash headMenu">DASHBOARD</span><span class="headMenu">HISTORY</span>';
            profile.innerText = 'PROFILE';
            const container = document.querySelector('.container');
            const newTaskButton = document.createElement('button');
            container.appendChild(newTaskButton);
            newTaskButton.innerText = '+ NEW TASK';
            newTaskButton.className = 'taskButton';
            newTaskButton.addEventListener('click', view.rightMenu); 
            const rightMenuDiv = document.createElement('div'); //right menu
            document.body.appendChild(rightMenuDiv);
            rightMenuDiv.id = 'rightMenu';
        }
        rightMenu (){
            const rightMenuDiv = document.getElementById('rightMenu');
            rightMenuDiv.innerHTML = '';
            rightMenuDiv.className = 'rightMenu';
            const taskOutput = document.createElement('div'); //task output
            taskOutput.className = 'taskOutput';
            rightMenuDiv.appendChild(taskOutput);
            const title = document.createElement('div');
            taskOutput.appendChild(title);
            title.innerHTML = '<h3>NEW TASK</h3>';
            const textArea = document.createElement('span');
            taskOutput.appendChild(textArea);
            textArea.className = 'taskText';
            const textDescription = document.createElement('span');
            taskOutput.appendChild(textDescription);
            textDescription.id = 'textDescription';
            const adres = document.createElement('div');
            taskOutput.appendChild(adres);
            adres.id = 'adres';
            adres.innerText = 'My adres is ';
            const createTask = document.createElement('button');
            taskOutput.appendChild(createTask);
            createTask.className = 'createTask';
            createTask.innerText = 'CREATE TASK';
            createTask.addEventListener('click', conrolUpdate.addNewTask);
            createTask.addEventListener('click', show.showTask);
            const form = document.createElement('form'); //create form
            rightMenuDiv.appendChild(form);
            const location = document.createElement('div');
            form.appendChild(location);
            location.innerHTML = '<h3>LOCATION</h3><textarea id="location"></textarea>';
            const textLocation = document.getElementById('location');
            textLocation.addEventListener("keyup", control.location);
           
            const service = document.createElement('div'); //create service
            form.appendChild(service);
            service.innerHTML = '<h3>SERVICE TYPE</h3><div class="serviceType"></div>';
            const serviceType = document.querySelector('.serviceType');
            const electrician = document.createElement('button');
            const plumber = document.createElement('button');
            const gardener = document.createElement('button');
            const hausekeeper = document.createElement('button');
            const cook = document.createElement('button');
            serviceType.appendChild(electrician);
            serviceType.appendChild(plumber);
            serviceType.appendChild(gardener);
            serviceType.appendChild(hausekeeper);
            serviceType.appendChild(cook);
            electrician.innerText = 'Electrician';
            electrician.className = 'serviceButton';
            electrician.addEventListener('click', view.chooseElectrician);
            electrician.addEventListener('click', control.taskList);
            plumber.innerText = 'Plumber';
            plumber.className = 'serviceButton';
            plumber.addEventListener('click', view.choosePlumber);
            plumber.addEventListener('click', control.taskList);
            gardener.innerText = 'Gardener';
            gardener.className = 'serviceButton';
            gardener.addEventListener('click', view.chooseGardener);
            gardener.addEventListener('click', control.taskList);
            hausekeeper.innerText = 'Hausekeeper';
            hausekeeper.className = 'serviceButton';
            hausekeeper.addEventListener('click', view.chooseHousekeeper);
            hausekeeper.addEventListener('click', control.taskList);
            cook.innerText = 'Cook';
            cook.className = 'serviceButton';
            cook.addEventListener('click', view.chooseCook);
            cook.addEventListener('click', control.taskList);
            
            const tasks = document.createElement('div'); //create task
            form.appendChild(tasks);
            tasks.innerHTML = '<h3 id="taskName">TASKS</h3><div class="tasks"></div>';
            
            const taskDescription = document.createElement('div');
            form.appendChild(taskDescription);
            taskDescription.innerHTML = '<h3>TASK DESCRIPTION</h3><textarea id="description"></textarea>';
            const description = document.getElementById('description');
            description.addEventListener("keyup", control.description);
        }
        choosePlumber (){
            const taskList = document.querySelector('.tasks');
            taskList.innerHTML = ``;
            const toilet = document.createElement('span');
            taskList.appendChild(toilet);
            toilet.innerText = 'Unblock a toilet';
            toilet.id = 'plumber';
            toilet.className = 'fixer';
            toilet.addEventListener('click', control.taskTxt);
            const sink = document.createElement('span');
            taskList.appendChild(sink);
            sink.className = 'fixer';
            sink.innerText = 'Install a sink';
            sink.addEventListener('click', control.taskTxt);
            sink.id = 'plumber';
            const waterLeak = document.createElement('span');
            taskList.appendChild(waterLeak);
            waterLeak.className = 'fixer';
            waterLeak.innerText = 'Fix a water leak';
            waterLeak.id = 'plumber';
            waterLeak.addEventListener('click', control.taskTxt);
        }
        chooseElectrician (){
            const taskList = document.querySelector('.tasks');
            taskList.innerHTML = ``;
            const electricity = document.createElement('span');
            taskList.appendChild(electricity);
            electricity.className = 'fixer';
            electricity.innerText = 'Disconnect electricity';
            electricity.id = 'Electrician';
            electricity.addEventListener ('click', control.taskTxt);
            const wiring = document.createElement('span');
            taskList.appendChild(wiring);
            wiring.className = 'fixer';
            wiring.innerText = 'Repair wiring';
            wiring.addEventListener('click', control.taskTxt);
            wiring.id = 'Electrician';
            const voltage = document.createElement('span');
            taskList.appendChild(voltage);
            voltage.className = 'fixer';
            voltage.innerText = 'Check voltage';
            voltage.id = 'Electrician';
            voltage.addEventListener('click', control.taskTxt);
        }
        chooseGardener (){
            const taskList = document.querySelector('.tasks');
            taskList.innerHTML = ``;
            const trees = document.createElement('span');
            taskList.appendChild(trees);
            trees.className = 'fixer';
            trees.innerText = 'Cut trees';
            trees.id = 'Gardener';
            trees.addEventListener('click', control.taskTxt);
            const flowers = document.createElement('span');
            taskList.appendChild(flowers);
            flowers.className = 'fixer';
            flowers.innerText = 'Water flowers';
            flowers.id = 'Gardener';
            flowers.addEventListener('click', control.taskTxt);
            const grass = document.createElement('span');
            taskList.appendChild(grass);
            grass.className = 'fixer';
            grass.innerText = 'Plant grass';
            grass.id = 'Gardener';
            grass.addEventListener('click', control.taskTxt);
        }
        chooseHousekeeper (){
            const taskList = document.querySelector('.tasks');
            taskList.innerHTML = ``;
            const windows = document.createElement('span');
            taskList.appendChild(windows);
            windows.className = 'fixer';
            windows.innerText = 'Clean windows';
            windows.id = 'Housekeeper';
            windows.addEventListener('click', control.taskTxt);
            const dishes = document.createElement('span');
            taskList.appendChild(dishes);
            dishes.className = 'fixer';
            dishes.id = 'Housekeeper';
            dishes.innerText = 'Wash the dishes';
            dishes.addEventListener('click', control.taskTxt);
            const room = document.createElement('span');
            taskList.appendChild(room);
            room.className = 'fixer';
            room.id = 'Housekeeper';
            room.innerText = 'Tide the room';
            room.addEventListener('click', control.taskTxt);
        }
        chooseCook (){
            const taskList = document.querySelector('.tasks');
            taskList.innerHTML = ``;
            const cake = document.createElement('span');
            taskList.appendChild(cake);
            cake.id = 'Cook';
            cake.className = 'fixer';
            cake.innerText = 'Bake a cake';
            cake.addEventListener('click', control.taskTxt);
            const party = document.createElement('span');
            taskList.appendChild(party);
            party.className = 'fixer';
            party.id = 'Cook';
            party.innerText = 'Prepare to the party';
            party.addEventListener('click', control.taskTxt);
            const bbq = document.createElement('span');
            taskList.appendChild(bbq);
            bbq.id = 'Cook';
            bbq.className = 'fixer';
            bbq.innerText = 'Make a barbecue';
            bbq.addEventListener('click', control.taskTxt);
        }
    }

    class Show {
        showTask (){
            const container = document.querySelector('.container');
            const newTask = document.createElement('div');
            container.appendChild(newTask);
            newTask.className = 'newTask';
            newTask.id = click;
            const dateTime = document.createElement('div');
            newTask.appendChild(dateTime);
            dateTime.className = 'dateTime';
            let date = new Date();
            function getDay (){
                    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    return days[date.getDay()];
            }
            function getMonth (){
                   let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                   return months[date.getMonth()];
            }
            dateTime.innerText = `${getDay()}, ${getMonth()} ${date.getDate()} ${date.getHours()}:${date.getMinutes(0, 0)}`;
            const taskDisplay = document.createElement('div');
            newTask.appendChild(taskDisplay);
            taskDisplay.className = 'taskDisplay';
            taskDisplay.id = `taskDisplay${click}`;
            taskDisplay.innerHTML = `${document.querySelector('.taskText').innerText}`;
            const editButton = document.createElement('button');
            newTask.appendChild(editButton);
            editButton.className = 'editButton';
            editButton.id = click;
            editButton.innerText = 'EDIT';
            editButton.addEventListener('click', show.openEditTask);
            const delButton = document.createElement('button');
            newTask.appendChild(delButton);
            delButton.className = 'delButton';
            delButton.id = click;
            delButton.innerText = 'DELETE';
            delButton.addEventListener('click', conrolUpdate.delTask);
        }

        openEditTask (e){
            let el = e.target.id;
            const rightMenuDiv = document.getElementById('rightMenu');
            rightMenuDiv.innerHTML = '';
            rightMenuDiv.className = 'rightMenu';
            const taskOutput = document.createElement('div'); //task output
            taskOutput.className = 'taskOutput';
            rightMenuDiv.appendChild(taskOutput);
            const title = document.createElement('div');
            taskOutput.appendChild(title);
            title.innerHTML = '<h3>NEW TASK</h3>';
            const textArea = document.createElement('span');
            taskOutput.appendChild(textArea);
            textArea.className = 'taskText';
            const textDescription = document.createElement('span');
            taskOutput.appendChild(textDescription);
            textDescription.id = 'textDescription';
            const adres = document.createElement('div');
            taskOutput.appendChild(adres);
            adres.id = 'adres';
            adres.innerText = 'My adres is ';

            const updButton = document.createElement('button'); //update Task
            taskOutput.appendChild(updButton);
            updButton.innerText = 'UPDATE';
            updButton.className = 'updButton';
            updButton.id = el;
            updButton.addEventListener('click', conrolUpdate.addUpdated);
            updButton.addEventListener('click', view.rightMenu);
            const form = document.createElement('form'); //create form
            rightMenuDiv.appendChild(form);
            const location = document.createElement('div');
            form.appendChild(location);
            location.innerHTML = '<h3>LOCATION</h3><textarea id="location"></textarea>';
            const textLocation = document.getElementById('location');
            textLocation.addEventListener("keyup", control.location);
            const service = document.createElement('div'); //create service
            form.appendChild(service);
            service.innerHTML = '<h3>SERVICE TYPE</h3><div class="serviceType"></div>';
            const serviceType = document.querySelector('.serviceType');
            const electrician = document.createElement('button');
            const plumber = document.createElement('button');
            const gardener = document.createElement('button');
            const hausekeeper = document.createElement('button');
            const cook = document.createElement('button');
            serviceType.appendChild(electrician);
            serviceType.appendChild(plumber);
            serviceType.appendChild(gardener);
            serviceType.appendChild(hausekeeper);
            serviceType.appendChild(cook);
            electrician.innerText = 'Electrician';
            electrician.className = 'serviceButton';
            electrician.addEventListener('click', view.chooseElectrician);
            electrician.addEventListener('click', control.taskList);
            plumber.innerText = 'Plumber';
            plumber.className = 'serviceButton';
            plumber.addEventListener('click', view.choosePlumber);
            plumber.addEventListener('click', control.taskList);
            gardener.innerText = 'Gardener';
            gardener.className = 'serviceButton';
            gardener.addEventListener('click', view.chooseGardener);
            gardener.addEventListener('click', control.taskList);
            hausekeeper.innerText = 'Hausekeeper';
            hausekeeper.className = 'serviceButton';
            hausekeeper.addEventListener('click', view.chooseHousekeeper);
            hausekeeper.addEventListener('click', control.taskList);
            cook.innerText = 'Cook';
            cook.className = 'serviceButton';
            cook.addEventListener('click', view.chooseCook);
            cook.addEventListener('click', control.taskList);
            
            const tasks = document.createElement('div'); //create task
            form.appendChild(tasks);
            tasks.innerHTML = '<h3 id="taskName">TASKS</h3><div class="tasks"></div>';
            
            const taskDescription = document.createElement('div');
            form.appendChild(taskDescription);
            taskDescription.innerHTML = '<h3>TASK DESCRIPTION</h3><textarea id="description"></textarea>';
            const description = document.getElementById('description');
            description.addEventListener("keyup", control.description);
        }
    }
    
    const view = new View(); //View
    const task = new Task(view); //Model
    const control = new ControllerToCreate(task); //Controller1
    const show = new Show(); //View2
    const task1 = new CreateEditDelete(show); //Model2
    const conrolUpdate = new ControllerUpdate(task1); //Controller2
    
    view.firstPage();
})