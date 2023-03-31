const postList = document.querySelector('.navbar-light')
const url = "http://localhost:8080/people/list";
let output = '';


data = JSON.parse(data);
fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(post => {
            output += `
            <a class="navbar-brand">
                <div class="container">
                    <div class="row">
                        <div th:object="${post}" class="col-sm text-light bg-dark">
                            <span th:text="${post.username}">user</span>
                            <span>with roles:</span>
                            <span th:text="${post.email}">role</span>
                        </div>
        
                    </div>
                </div></a>
            <div class="col-sm-20">
                <div>
                    <a class="text-muted" th:href="@{/logout}">Logout</a>
                </div>
            </div>
            `;

        })
        postList.innerHTML = output;
    })
