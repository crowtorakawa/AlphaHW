
const id_URL = "https://user-list.alphacamp.io/api/v1/users/"
const dataPanel = document.querySelector('#data-panel')
const paginator = document.querySelector('#paginator')
const VIP = document.querySelector(".btn-remove-VIP")
// define----------------------------

let addID = 0;

const userList = JSON.parse(localStorage.getItem('VIPlist'));
const pageCount = 10;

//搜尋列位置定義
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

//搜尋列事件
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

//初始渲染
displayUserList(getUser(1))
renderPaginator(userList.length)

//頁數
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

function delVIP(id) {
  if (!userList || !userList.length) return

  //透過 id 找到要刪除電影的 index
  const list = userList.findIndex((x) => x.id === id)
  if (list === -1) return

  //刪除該筆電影
  userList.splice(list, 1)

  //存回 local storage
  localStorage.setItem('VIPlist', JSON.stringify(userList))

  //更新頁面
  displayUserList(getUser(1))

}

//渲染頁
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

//點擊頁碼
paginator.addEventListener('click', function onPaginatorClicked(event) {
  //如果被點擊的不是 a 標籤，結束
  if (event.target.tagName !== 'A') return

  //透過 dataset 取得被點擊的頁數
  const page = Number(event.target.dataset.page)
  //更新畫面
  displayUserList(getUser(page))
})

dataPanel.addEventListener('click', (event) => {
  console.log("11111");
  if (event.target.matches('.img-thumbnail')) {
    console.log("00000")
    console.log(event.target.dataset.id)
    showUserModal(Number(event.target.dataset.id));
    addID = event.target.dataset.id;
  }
})

VIP.addEventListener('click', function() {
  delVIP(Number(addID))
})

function showUserModal(id) {
  const modalTitle = document.querySelector('#user-modal-title')
  const modalImage = document.querySelector('#user-modal-image')
  const modalData = document.querySelector('#user-modal-data')

  const data = userList;
  // console.log(data[1].id)
  for (var i in data) {
    if (Number(data[i].id) === id) {
      console.log("22222")
      console.log(data[i].avatar)
      modalTitle.innerText = `${data[i].name} ${data[i].surname}`
      modalImage.innerHTML = `<img src="${data[i].avatar}"alt="movie-poster" class="img">`
      modalData.innerHTML = `<p> email：${data[i].email} </p>
      <p> gender：${data[i].gender} </p>
      <p> age：${data[i].age} </p>
      <p> birthday：${data[i].birthday} </p>
      <p> created：${data[i].created_at} </p>
      <p> updated：${data[i].updated_at} </p>
      `
    }
  }
}


