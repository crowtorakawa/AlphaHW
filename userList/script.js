const id_URL = "https://user-list.alphacamp.io/api/v1/users/"
const dataPanel = document.querySelector('#data-panel')
const paginator = document.querySelector('#paginator')
const VIP = document.querySelector(".btn-add-VIP")
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
// define----------------------------

let addID = 0;
const userList = [];
const pageCount = 48;

searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
  //取消預設事件
  event.preventDefault()
  //取得搜尋關鍵字
  const keyword = searchInput.value.trim().toLowerCase()
  //儲存符合篩選條件的項目
  let filteredMovies = []
  //錯誤處理：輸入無效字串
  if (!keyword.length) {
    return alert('請輸入有效字串！')
  }
  //條件篩選
  filteredMovies = userList.filter((movie) =>
    movie.name.toLowerCase().includes(keyword)
  )
  //重新輸出至畫面
  displayUserList(filteredMovies)
})

axios
  .get(id_URL)
  .then((response) => {
    userList.push(...response.data.results)
    // console.log(userList[7].avatar)
    console.log(userList.length)
    displayUserList(getUser(1))
    renderPaginator(userList.length)
  })
  .catch((err) => console.log(err))


function getUser(page) {
  const startIndex = (page - 1) * pageCount
  return userList.slice(startIndex, startIndex + pageCount)
}

function renderPaginator(amount) {
  //計算總頁數
  const numberOfPages = Math.ceil(amount / pageCount)
  //製作 template 
  let rawHTML = ''
  for (let page = 1; page <= numberOfPages; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  //放回 HTML
  paginator.innerHTML = rawHTML
}

function addToVIP(id) {
  // console.log(id)
  const list = JSON.parse(localStorage.getItem('VIPlist')) || []
  const VIP = userList.find((VIP) => VIP.id === id)
  if (list.some((VIP) => VIP.id === id)) {
    return alert('此使用者已經是貴賓')
  }
  list.push(VIP)
  localStorage.setItem('VIPlist', JSON.stringify(list))
}


function displayUserList(data) {
  let gethtml = ''
  data.forEach((item) => {
    // console.log(item.avatar)
    gethtml += `
    <div class="col-sm-1">
      <div class="mb-2">
        <div class="card">
          <img src="${item.avatar}"   
            class="img-thumbnail"     
            class="openPerson" 
            data-bs-toggle="modal" 
            data-bs-target="#user-modal" 
            data-id="${item.id}" alt="...">
          <h5>${item.name}</h5>
        </div>
      </div>
     </div>
    `
  })
  dataPanel.innerHTML = gethtml;
}

paginator.addEventListener('click', function onPaginatorClicked(event) {
  //如果被點擊的不是 a 標籤，結束
  if (event.target.tagName !== 'A') return
  //透過 dataset 取得被點擊的頁數
  const page = Number(event.target.dataset.page)
  //更新畫面
  displayUserList(getUser(page))
})

dataPanel.addEventListener('click', function(event) {
  console.log("11111");
  if (event.target.matches('.img-thumbnail')) {
    console.log("00000")
    showUserModal(event.target.dataset.id);
    addID = event.target.dataset.id;
  }
})

VIP.addEventListener('click', function() {
  addToVIP(Number(addID))
})


// 
function showUserModal(id) {
  const modalTitle = document.querySelector('#user-modal-title')
  const modalImage = document.querySelector('#user-modal-image')
  const modalData = document.querySelector('#user-modal-data')

  axios.get(id_URL + id).then((response) => {
    const data = response.data
    console.log("22222")
    console.log(data.avatar)
    modalTitle.innerText = `${data.name} ${data.surname}`
    modalImage.innerHTML = `<img src="${data.avatar}"alt="movie-poster" class="img">`
    modalData.innerHTML = `<p> email：${data.email} </p>
    <p> gender：${data.gender} </p>
    <p> age：${data.age} </p>
    <p> birthday：${data.birthday} </p>
    <p> created：${data.created_at} </p>
    <p> updated：${data.updated_at} </p>
      `
  })
}


