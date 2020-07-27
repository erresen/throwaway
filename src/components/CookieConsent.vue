<template>
  <div v-if="dismissed===false" class="cookieConsentContainer" id="cookieConsentContainer">
    <div class="cookieDesc">
      <p>
        This website uses cookies to ensure you get the best experience. For more details, see the
        <a
          href="/privacy"
          target="_blank"
        >privacy policy</a>.
      </p>
    </div>
    <div class="cookieButton">
      <a v-on:click="setCookie">ACCEPT</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CookieConsent",
  data() {
    return {
      dismissed: true,
      cookieName: "purecookieDismiss",
      expireDays: 365,
    };
  },
  methods: {
    getCookie() {
      var nameEQ = this.cookieName + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }
      return null;
    },
    setCookie() {
      let date = new Date();
      date.setTime(date.getTime() + this.expireDays * 24 * 60 * 60 * 1000);
      let expires = "; expires=" + date.toUTCString();

      document.cookie =
        this.cookieName + "=" + (1 || "") + expires + "; path=/";

      this.dismissed = true;
    },
  },
  created() {
    let cookie = this.getCookie();
    if (cookie) {
      this.dismissed = true;
    } else {
      this.dismissed = false;
    }
  },
};
</script>

<style scoped>
.cookieConsentContainer {
  z-index: 999;
  max-width: 450px;
  min-height: 20px;
  box-sizing: border-box;
  padding: 20px 20px 20px 20px;
  background: #f4f4f4;
  overflow: hidden;
  position: fixed;
  bottom: 10px;
  right: 10px;
  text-align: left;
}
.cookieDesc p {
  margin: 0;
  padding: 0;
  color: #2c3e50;
  line-height: 20px;
  display: block;
}
.cookieDesc a {
  color: #000000;
  text-decoration: none;
}
.cookieDesc a:hover {
  color: #2c3e50;
  text-decoration: underline;
}
.cookieButton a {
  display: inline-block;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  margin-top: 14px;
  background: #555;
  box-sizing: border-box;
  padding: 15px 24px;
  text-align: center;
  transition: background 0.3s;
}
.cookieButton a:hover {
  cursor: pointer;
  background: #000;
  text-decoration: none;
}
</style>
