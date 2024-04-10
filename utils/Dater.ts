const timeAgo = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
};

const toLocaleDate = (timestamp?: number) => {
  if (!timestamp) {
    return "";
  }
  // Unix zaman damgasını milisaniyeye dönüştür
  var unixTimeStampInMilliseconds = timestamp * 1000;

  // Yeni bir Date nesnesi oluştur ve Unix zaman damgasını kullanarak ayarla
  var date = new Date(unixTimeStampInMilliseconds);

  // Tarihi istediğiniz formata dönüştürmek için kullanılabilir metotlar
  var year = date.getFullYear();
  var month = date.getMonth() + 1; // JavaScript'te aylar 0'dan başlar, bu yüzden +1 ekliyoruz
  var day = date.getDate();

  // İstenilen formatta tarih oluşturmak için
  var formattedDate = day + "/" + month + "/" + year;

  return formattedDate;
};

export const Dater = {
  timeAgo,
  toLocaleDate
};
