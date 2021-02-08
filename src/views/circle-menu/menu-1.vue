<template>
  <div class="__tag_container__">
    <div class="__tag__">
      <div class="btn-pluss-wrapper">
        <h2 class="tooltip">Tag!</h2>
        <div href="#" class="btn-pluss">
          <ul>
            <li v-for="tag in tags" :key="tag.name">
							<a 
								v-clipboard="tag.value"
								v-clipboard:success="clipboardSuccessHandler"
							>
								{{ tag.name }}
							</a>
						</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const TAGS = {
  ORG_NAME: {
    name: "Đơn vị",
    value: "${orgName}",
    sample: "Ban Công nghệ Thông tin"
  },
  POS_NAME: {
    name: "Chức danh",
    value: "${positionName}",
    sample: "Trưởng ban"
  },
  EMPLOYEE_CODE: {
    name: "Mã nhân viên",
    value: "${employeeCode}",
    sample: "999999"
  },
  FULLNAME: {
    name: "Họ và tên",
    value: "${fullname}",
    sample: "Trần Văn X"
  },
  ALIAS_NAME: {
    name: "Bí danh",
    value: "${aliasName}",
    sample: "Nguyễn Văn A"
  },
  BIRTHDAY: {
    name: "Sinh nhật",
    value: "${birthday}",
    sample: "01-01-1970"
  },
  PLACE_OF_BIRTH: {
    name: "Nơi sinh",
    value: "${placeOfBirth}",
    sample: "Hà Nội"
  },
  EMAIL: {
    name: "Email",
    value: "${email}",
    sample: "duongvx45@viettel.com.vn"
  },
  PHONE: {
    name: "Số điện thoại",
    value: "${phone}",
    sample: "0375509588"
  },
  PASSPORT_NUMBER: {
    name: "Số passport",
    value: "${passportNumber}",
    sample: "EC4744643"
  },
  ADDRESS: {
    name: "Địa chỉ",
    value: "${address}",
    sample: "35A Trần Thái Tông, Cầu Giấy, Hà Nội"
  },
  FAX: {
    name: "FAX",
    value: "${fax}",
    sample: "1234567890@rcfax.com"
  },
  NOW: {
    name: "Thời gian hiện tại",
    value: "${now}",
    sample: "15/01/2021 15:30:00"
  }
}

export default {
	name: 'MenuOne',
	data() {
		return {
			tags: TAGS
		}
	},
	methods: {
		clipboardSuccessHandler({ value, event }) {
			console.log(`Copy mã tag thành công!`)
		}
	}
}
</script>
<style lang="scss" scoped>
.__tag_container__ {
	position: absolute;
	width: 100vw;
	height: 100vh;
	margin-left: 25px;
	background-color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: salmon;
  font-family: sans-serif;
}
.__tag__ {
  * {
    box-sizing: border-box;
  }

  .btn-pluss {
    overflow: hidden;
    position: relative;
    display: block;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 22px;
    width: 30px;
    margin: 0 auto;
    background-color: white;
    transition: width 0.3s 0.5s ease, border-radius 1.1s ease;
    a {
      display: block;
      position: relative;
      color: #fa434b;
      text-decoration: none;
      overflow: hidden;
      padding: 5px;
      border-radius: 5px;
			cursor: pointer;
      &:hover {
        text-decoration: inherit;
        color: white;
        background-color: #fa434b;
        transition: background-color 0.5s ease;
      }
    }
    &:after {
      content: '+';
      position: absolute;
      top: 50%;
      left: 50%;
      display: block;
      height: 20px;
      width: 20px;
      border-radius: 100%;
      line-height: 20px;
      text-align: center;
      font-size: 1.1rem;
      background-color: #fa434b;
      color: white;
      transform: translateY(-50%) translateX(-50%);
      transition: all 0.3s 0.5s ease;
      cursor: pointer;
      cursor: hand;
    }
    ul {
      opacity: 0;
    }
    ul {
			padding: 0;
      margin-top: 15px;
      opacity: 0;
      width: 100%;
      margin-left: 0px;
      transition: all 0.5s ease;
      text-align: center;
      font-size: 0.9rem;
      li {
        background-color: #e4e4e4;
        margin-top: 0px;
        border-radius: 5px;
        width: 100%;
        height: 0px;
        overflow: hidden;
        transition: height 1s ease;
      }
    }
  }
  .tooltip {
    position: relative;
    padding: 5px;
    border-radius: 5px;
    width: 70px;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bold;
    margin: 0 auto;
    margin-bottom: 15px;
    animation-duration: 2s;
    animation-name: jump;
    animation-iteration-count: infinite;
    background-color: #fff;
    color: #fa434b;
    transition: all 1s ease;
    pointer-events: none;
    &::after {
      content: '';
      position: absolute;
      transform: rotate(45deg);
      display: block;
      height: 10px;
      width: 10px;
      left: 0;
      right: 0;
      margin: 0 auto;
      background-color: inherit;
    }
    &::before {
      content: '';
      color: white;
    }
  }
  .btn-pluss-wrapper:hover {
    .tooltip {
      animation-duration: 0s;
      transition: all 1s ease;
      color: white;
      width: 90px;
      &::before {
        content: 'Chọn!';
        display: block;
        color: #fa434b;
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        margin: 0 auto;
        transform: translateY(-50%);
        transition: all 1s 0.3s ease;
      }
    }
    .btn-pluss {
      width: 150px;
      border-radius: 15px;
      padding-bottom: 5px;
      transition: width 0.3s ease, border-radius 0.3s ease,
        padding-bottom 0.3s ease;
      &::after {
        transition: all 0.3s ease;
        left: 50%;
        top: 10px;
        transform: translateY(-5px) translateX(-50%);
      }
      ul {
        opacity: 1;
        margin-top: 30px;
        transition: all 1s ease;
      }
      li {
        height: 25px;
				margin-top: 5px;
        transition: height 1s ease;
        &:hover {
          border-bottom: 1px solid darken(#e9e5e5, 10);
        }
      }
    }
  }
  @keyframes jump {
    0% {
      transform: translateY(3px);
    }
    50% {
      transform: translateY(-15px);
    }
    100% {
      transform: translateY(3px);
    }
  }
}
</style>
