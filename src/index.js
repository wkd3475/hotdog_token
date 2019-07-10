import Caver from "caver-js";
import {Spinner} from "spin.js";

const config = {
    rpcURL: 'https://api.baobab.klaytn.net:8651'
}
const cav = new Caver(config.rpcURL);
const agContract = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const App = {
    auth: {
        accessType: 'keystore',
        keystore: '',
        password: ''
    },

    start: async function () {
        $('#token-name').text()
    },

    handleImport: async function () {
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0]);
        fileReader.onload = (event) => {
            try {
                if (!this.checkValidKeystore(event.target.result)) {
                    $('#message').text('유효하지 않은 keystore 파일입니다.');
                    return;
                }
                this.auth.keystore = event.target.result;
                $('#message').text('keystore 통과. 비밀번호를 입력하세요.');
                document.querySelector('#input-password').focus();
            } catch (event) {
                $('#message').text('유효하지 않은 keystore 파일입니다.');
                return;
            }
        }
    },

    checkValidKeystore: function (keystore) {
        const parsedKeystore = JSON.parse(keystore);
        const isValidKeystore = parsedKeystore.version &&
            parsedKeystore.id &&
            parsedKeystore.address &&
            parsedKeystore.crypto;

        return isValidKeystore;
    },

    handlePassword: async function () {
        this.auth.password = event.target.value;
    },

    handleLogin: async function () {
        if (this.auth.accessType === 'keystore') {
            try {
                const privateKey = cav.klay.accounts.decrypt(this.auth.keystore, this.auth.password).privateKey;
                this.integrateWallet(privateKey);
            } catch (e) {
                $('#message').text('비밀번호가 일치하지 않습니다.');
            }
        }
    },

    handleLogout: async function () {
        this.removeWallet();
        location.reload();
    },

    removeWallet: function () {
        cav.klay.accounts.wallet.clear();
        sessionStorage.removeItem('walletInstance');
        this.reset();
    },

    showSpiner: function () {
        var target = document.getElementById("spin");
        return new Spinner(opts).spin(target);
    },

    reset: function () {
        this.auth = {
            keystore: '',
            password: ''
        };
    }
};

window.App = App;

window.addEventListener("load", function() {
    App.start();
});

var opts = {
    lines: 10, // The number of lines to draw
    length: 30, // The length of each line
    width: 17, // The line thickness
    radius: 45, // The radius of the inner circle
    scale: 1, // Scales overall size of the spinner
    corners: 1, // Corner roundness (0..1)
    color: '#5bc0de', // CSS color or array of colors
    fadeColor: 'transparent', // CSS color or array of colors
    speed: 1, // Rounds per second
    rotate: 0, // The rotation offset
    animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
    direction: 1, // 1: clockwise, -1: counterclockwise
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    className: 'spinner', // The CSS class to assign to the spinner
    top: '50%', // Top position relative to parent
    left: '50%', // Left position relative to parent
    shadow: '0 0 1px transparent', // Box-shadow for the lines
    position: 'absolute' // Element positioning
};