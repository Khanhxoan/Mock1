
### Component chứa những component về login và register
- folder login: 
    + login.js: component login
    + tokenExpired: Kiểm tra hạn token
- folder register:
    + register.js: component đăng kí tài khoản
### Layout bao gồm:
- Layout.js: Chứa layout chính của app
- folder admin: Là layout của admin display
    + admin-question: layout của trang get list questions, edit, create question
    + admin-answer: layout của trang get list users và create User
- folder user: Là user display
    + setting.js: là file lựa chọn số câu hỏi
    + questions.js: là file hiển thị bài test
    + score: là màn hình khi hoàn thành bài test
- NotFoundPage.js: Màn hình khi người nhập truy cập sai link

### redux: kho quản lí state
- apiRequest: các action thực hiện call api
- store: Create store, khai báo các reducer
- Còn lại là các slice 

### những package đang dùng
- react-redux
- react- redux/toolkit
- antD
- react-router-dom
- redux-persit