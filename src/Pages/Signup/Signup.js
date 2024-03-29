import React from 'react';
import { withRouter } from 'react-router-dom';
import SignupInputWrap from '../../Components/Signup/SignupComponents/Components/SignupInputWrap/SignupInputWrap';
import SignInputTermsBox from '../../Components/Signup/SignupComponents/Components/SignInputTermsBox/SignInputTermsBox';
import { API } from '../../config';
import './Signup.scss';

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      isCheck1: false,
      isCheck2: false,
      allCheckBox: false,
      nameValue: '',
      idValue: '',
      pwValue: '',
      pwValueReconfirm: '',
      adressValue: '',
      emailValue: '',
      mobileFirst: '010',
      mobileSecond: '',
      mobileThird: '',
    };

    this.checkID = this.checkID.bind(this);
  }

  changeAll = () => {
    const { allCheckBox } = this.state;
    this.setState({ isCheck1: !allCheckBox, isCheck2: !allCheckBox });
  };

  inputAllCheckBox = () => {
    const { isCheck1, isCheck2 } = this.state;
    this.setState({ allCheckBox: isCheck1 && isCheck2 });
  };

  handleChange = () => {
    this.setState(state => ({
      allCheckBox: !state.allCheckBox,
    }));
  };

  handelInput = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  goToLogin = () => {
    fetch(`${API}/users/signup`, {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.nameValue,
        account: this.state.idValue,
        password: this.state.pwValue,
        mobile:
          this.state.mobileFirst +
          this.state.mobileSecond +
          this.state.mobileThird,
        address: this.state.adressValue,
        email: this.state.emailValue,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'SUCCESS') {
          alert('회원가입 되었습니다.');
          this.props.history.push('/login');
        } else if (result.message === 'VALUE_IS_EMPTY') {
          alert('입력창을 다시 확인 해주세요.');
        } else if (result.message === 'INVALID_FORMAT') {
          alert('알맞지 않은 형식입니다 다시 확인 해주세요');
        } else if (result.message === 'ALREADY_EXISTS') {
          alert('중복된 ID입니다.');
        }
      });
  };

  toggleCheckBox = event => {
    const { name } = event.target;
    this.setState(
      {
        [name]: !this.state[name],
      },
      this.inputAllCheckBox
    );
  };

  checkID(e) {
    e.preventDefault();
    fetch(`${API}/users/account-validator`, {
      method: 'POST',
      body: JSON.stringify({
        account: this.state.idValue,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.message === 'ALREADY_EXISTS') {
          alert('중복된 ID입니다. 다른 ID를 입력해주세요');
        } else if (result.message === 'INVALID_FORMAT') {
          alert('알맞는 형식을 입력해주세요');
        } else alert('가입 가능한 ID 입니다.');
      });
  }

  render() {
    console.log(
      this.state.mobileFirst + this.state.mobileSecond + this.state.mobileThird
    );
    const {
      handelInput,
      changeAll,
      handleChange,
      toggleCheckBox,
      goToLogin,
      checkID,
    } = this;
    const {
      pwValueReconfirm,
      checked,
      pwValue,
      isCheck1,
      isCheck2,
      allCheckBox,
      mobileFirst,
    } = this.state;
    return (
      <div className="Signup">
        <div className="container">
          <div className="signupWrapTitle">
            <h1>회원가입</h1>
          </div>
          <div className="signupInfo">
            BISKIT 홈페이지에 오신 것을 환영합니다. 회원가입은 '정보 입력 > 약관
            동의' 과정을거쳐 완료됩니다.
          </div>
          <div className="signupInputInfo">
            <h3>기본정보</h3>
            <div className="signupInputInfoRequired">
              <img alt="필수" src="/images/Signup/Required.gif" />
              <span>필수입력사항</span>
            </div>
          </div>
          <SignupInputWrap
            handelInput={handelInput}
            pwValueReconfirm={pwValueReconfirm}
            pwValue={pwValue}
            checkID={checkID}
            mobileFirst={mobileFirst}
          />
          <SignInputTermsBox
            checked={checked}
            allCheckBox={allCheckBox}
            changeAll={changeAll}
            handleChange={handleChange}
            toggleCheckBox={toggleCheckBox}
            isCheck1={isCheck1}
            isCheck2={isCheck2}
          />
          <div className="signupButtonElement">
            <button
              className="signupButton"
              onClick={goToLogin}
              disabled={!allCheckBox}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Signup);
