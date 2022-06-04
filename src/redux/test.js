    const refreshToken = async (refreshtoken) => {
      try {
        const res = await axiosJWT.post('https://fwa-ec-quiz-mock1.herokuapp.com/v1/auth/refresh-tokens', {
          refreshToken: refreshtoken          
        });
        return res.data;
      } catch(err) {
        console.log(err);
      }
    }
    
    // axios.interceptor: có chức năng => trước khi gửi request với axiosJWT
      //   nó sẽ check những thứ có trong code interceptors.request.use trước
    axiosJWT.interceptors.request.use(
      //code
      // cài đặt : npm install jwt-decode => kiểm tra thời gian hết hạn của JWT
      async(config) => {
        let date = new Date();
        const decodedToken = jwtDecode(user?.token); // => giải mã token:giống jwt.io => lấy ra được exp(thời gian hết hạn)
        if(decodedToken.exp < date.getTime() / 1000 ) {
          const data = await refreshToken();
          const refreshUser = {
            ...user.tokens, 
            access: data.token, 
            refresh: data.refresh
          };
          dispatch (loginSuccess(refreshUser));
          config.headers['Authorization'] = 'Bearer '+ data.token; 
        }
        return config;
      },
      (err) => {
        return Promise.reject(err)
      }
    )
