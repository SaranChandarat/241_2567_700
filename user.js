const BASE_URL = 'http://localhost:8000'

window.onload = async () => {
    await loadData()
}

const loadData = async () =>{
    console.log('user page loaded');
    //1.load user ทั้งหมด จาก api ที่เตรียมไว้
    const response = await axios.get(`${BASE_URL}/users`)

    console.log(response.data)

    const userDOM = document.getElementById('user')
     //2.นำ user ทั้งหมด โหลดกลับไปเข้าไปใน html

    let htmlData = '<table>'
    for (let i = 0; i < response.data.length; i++){
       let user = response.data[i]
       htmlData += `<tr>
       <td>
       ${user.id}</td> <td> ${user.firstname} </td> <td> ${user.lastname} </td>
       <td> <a href='index.html?id=${user.id}'><button>Edit</button></a> </td>
       <td> <button class = 'delete' data-id=' ${user.id}'> Delete</button> </td>
       </tr>`
    }
    htmlData += '</table>'
    userDOM.innerHTML = htmlData;

    //3. ลบ user
    const deleteDOMs = document.getElementsByClassName('delete')
    for (let i = 0; i < deleteDOMs.length; i++){
        deleteDOMs[i].addEventListener('click',async(event) =>{
            //ดึง
            const id = event.target.dataset.id
            try{
                await axios.delete(`${BASE_URL}/users/${id}`)
                loadData() //เรียกใช้ฟังก์ชันตัวเอง
            }catch (error){
                console.log('error',error)
            }
        })
    }

}