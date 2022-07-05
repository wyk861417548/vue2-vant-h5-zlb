/**
   * 根据身份证号码获取性别，性别是根据身份证的倒数第二位来判断的，奇数为男，偶数为女
   * @param {*} idCard
   * @returns
  */
export function getSexFromIdCard(idCard) {
  let sex = "";
  if (parseInt(idCard.slice(-2, -1) % 2) == 1) {
    sex = "male";
  } else {
    sex = "female";
  }
  return sex;
}

/**
 * 根据出生年月日获取年龄
 * @param {*} birthday
 * @returns
 */
export function getAgeFromBirthday(birthday) {
  let birthDate = new Date(birthday)
  let nowDateTime = new Date()
  let age = nowDateTime.getFullYear() - birthDate.getFullYear()
  if (nowDateTime.getMonth() < birthDate.getMonth() ||
    (nowDateTime.getMonth() == birthDate.getMonth() &&
      nowDateTime.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

/**
 * 根据身份证号码获取出生年月日
 * @param {*} idCard
 * @returns
 */
export function getBirthdayFromIdCard (idCard) {
  let birthday = "";
  if (idCard != null && idCard != "") {
    if (idCard.length == 15) {
      birthday = "19" + idCard.substr(6, 6);
    } else if (idCard.length == 18) {
      birthday = idCard.substr(6, 8);
    }
    birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
  }
  return birthday;
}