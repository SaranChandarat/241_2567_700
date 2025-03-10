const validateData = (userData) => {
    let errors =[]

    if (!userData.firstname){
        errors.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastname){
        errors.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age){
        errors.push('กรุณากรอกอายุ');
    }
    if (!userData.gender){
        errors.push('กรุณาเลือกเพศ');
    }
    if (!userData.interest){
        errors.push('กรุณาเลือกความสนใจ');
    }
    if (!userData.description){
        errors.push('กรุณากรอกข้อมูล');
    }
    return errors;
 } // data validation

 
 const submitData = async () => {
    let firstNameDOM = document.querySelector('input[name = firstname]')
    let lastNameDOM = document.querySelector('input[name =lastname]');
    let ageDOM = document.querySelector('input[name =age]');
    let genderDOM = document.querySelector('input[name= gender]:checked') || {};
    let interestDOM = document.querySelectorAll('input[name=interest]:checked') || {}; //null = อ่านค่าไม่ได้ error {} = ไม่มีค่ายังอ่านได้
    let descriptionDOM = document.querySelector('textarea[name=description]');

    let messageDOM = document.getElementById('message');

    try{
    let interest='';
    for(let i=0; i<interestDOM.length; i++){
        interest += interestDOM[i].value;
        if (i !=interestDOM.length-1){
            interest += ',';
        }
    }

    let userData = {
        firstname: firstNameDOM.value,
        lastname: lastNameDOM.value,
        age: ageDOM.value,
        gender: genderDOM.value,
        description: descriptionDOM.value,
        interest: interest,
        
    }

    console.log('submit data',userData);
/*
        const errors = validateData(userData);
        if (errors.length > 0)//มี errorเกิดขึ้นกี่ตำแหน่ง
        {
            throw{
                message:'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
            */
        const response =  await axios.post('http://localhost:8000/users',userData)
        console.log('response',response.data);
        messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อยแล้ว';
        messageDOM.className = 'message success';
    }catch(error){
        console.log('error message',error.message);
        console.log('error',error.errors);

        if (error.response){
            console.log(error.response);
            error.message = error.response.data.message;
            error.errors = error.response.data.errors;
        }  

        let htmlData = '<div>'
        htmlData += `<div>${error.message}</div>`
        htmlData += '<ul>'
        for (let i=0; i<error.errors.length; i++){
                htmlData += `<li> ${error.errors[i]} </li>`
            }
        htmlData += '</ul>'
        htmlData += '</div>'
         messageDOM.innerHTML = htmlData
         messageDOM.className = 'message danger'
    }   

}