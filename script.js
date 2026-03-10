const inputText = document.querySelector('#search');
const container = document.querySelector('main');

let allUsers = [];


//fetchUsers
async function fetchUsers(){
    try{

       const response = await fetch('https://jsonplaceholder.typicode.com/users');

       if(!response.ok){
        throw new Error("No users found");
       }

       allUsers = await response.json();

       renderUsers(allUsers);

    } catch(error){
        console.log("Failed to fetch users.",error.message);
    }
}

//displayUsers
function renderUsers(users){
    container.innerHTML = '';
   
    if(users.length === 0){
        container.innerHTML = `<p>No user found!</p>`;
        return;
    }

    users.forEach(user=>{
       const card = `
     <div class="card">
       <h3>Name: ${user.name}</h3>
       <p>Email: ${user.email}</p>
       <p>Company: ${user.company.name}</p>
     </div>
    `;

    container.innerHTML += card;
    })
}

//filteredUsers
function searchUsers(){

    const term = inputText.value.toLowerCase();

    const filteredUsers = allUsers.filter(user=>{
        user.name.toLowerCase().includes(term);
    })

    renderUsers(filteredUsers);
}

inputText.addEventListener('input',searchUsers);

fetchUsers();