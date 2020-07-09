<template>
  <div>
    <div class="current-container">
      <div class="services-container">
        <div class="service-group">
          <label for="mailinator-radio">Mailinator</label>
          <input
            type="radio"
            id="mailinator-radio"
            value="mailinator"
            v-model="service"
            v-on:change="setEmailForPrefix"
          />
        </div>
        <div class="service-group">
          <label for="maildrop-radio">Maildrop</label>
          <input
            type="radio"
            id="maildrop-radio"
            value="maildrop"
            v-model="service"
            v-on:change="setEmailForPrefix"
          />
        </div>
      </div>
      <div class="email-container">
        <span
          class="btn left-refresh"
          v-on:click="generateNew"
          title="Generate new throwaway email"
        >
          <svg
            aria-hidden="true"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"
            />
          </svg>
        </span>
        <span class="email">{{email}}</span>
        <span
          class="btn right-refresh"
          v-on:click="generateNew"
          title="Generate new throwaway email"
        >
          <svg
            aria-hidden="true"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"
            />
          </svg>
        </span>
        <a
          href="javascript:void(0);"
          type="button"
          class="btn"
          v-clipboard:copy="email"
          v-clipboard:success="onCopy"
          title="Copy to clipboard"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              fill="currentColor"
              d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM192 40c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm144 418c0 3.3-2.7 6-6 6H54c-3.3 0-6-2.7-6-6V118c0-3.3 2.7-6 6-6h42v36c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-36h42c3.3 0 6 2.7 6 6z"
            />
          </svg>
        </a>
        <a
          :href="inboxUrl"
          type="button"
          class="btn"
          target="_blank"
          rel="noopener noreferrer"
          v-on:click="onInboxClick"
          title="Go to inbox"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M494.586 164.516c-4.697-3.883-111.723-89.95-135.251-108.657C337.231 38.191 299.437 0 256 0c-43.205 0-80.636 37.717-103.335 55.859-24.463 19.45-131.07 105.195-135.15 108.549A48.004 48.004 0 0 0 0 201.485V464c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V201.509a48 48 0 0 0-17.414-36.993zM464 458a6 6 0 0 1-6 6H54a6 6 0 0 1-6-6V204.347c0-1.813.816-3.526 2.226-4.665 15.87-12.814 108.793-87.554 132.364-106.293C200.755 78.88 232.398 48 256 48c23.693 0 55.857 31.369 73.41 45.389 23.573 18.741 116.503 93.493 132.366 106.316a5.99 5.99 0 0 1 2.224 4.663V458zm-31.991-187.704c4.249 5.159 3.465 12.795-1.745 16.981-28.975 23.283-59.274 47.597-70.929 56.863C336.636 362.283 299.205 400 256 400c-43.452 0-81.287-38.237-103.335-55.86-11.279-8.967-41.744-33.413-70.927-56.865-5.21-4.187-5.993-11.822-1.745-16.981l15.258-18.528c4.178-5.073 11.657-5.843 16.779-1.726 28.618 23.001 58.566 47.035 70.56 56.571C200.143 320.631 232.307 352 256 352c23.602 0 55.246-30.88 73.41-45.389 11.994-9.535 41.944-33.57 70.563-56.568 5.122-4.116 12.601-3.346 16.778 1.727l15.258 18.526z"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import throwaway from "../throwaway";
export default {
  name: "AddEmail",
  data() {
    return {
      email: "",
      service: throwaway.defaultService,
      prefix: "",
      inboxUrl: ""
    };
  },
  methods: {
    addToHistory() {
      const newHistoryItem = {
        email: this.email,
        service: this.service
      };
      this.$emit("add-history-item", newHistoryItem);
    },
    generateNew() {
      this.prefix = throwaway.generate();
      this.setEmailForPrefix();
    },
    setEmailForPrefix() {
      let domain = throwaway.getServiceDomain(this.service);
      this.email = `${this.prefix}@${domain}`;

      this.inboxUrl = throwaway.getInboxUrl(this.prefix, this.service);
    },
    onCopy() {
      this.addToHistory();
    },
    onInboxClick() {
      this.addToHistory();
    }
  },
  created() {
    this.generateNew();
  }
};
</script>

<style scoped>
.current-container {
  display: grid;
  justify-items: center;
  width: 100%;
}
.email-container {
  display: grid;
  max-width: 764px;
  width: 100%;
  margin: 20px;
  align-items: center;
  grid-template-rows: 55px 55px;
  grid-row-gap: 15px;
}

@media (min-width: 768px) {
  .email-container {
    grid-template-columns: 90px auto 90px 90px;
    grid-template-rows: 55px;
  }

  .email-container span.right-refresh {
    display: none;
  }
}
@media (max-width: 767px) {
  .email-container span.left-refresh {
    display: none;
  }

  .email-container span.email {
    grid-column: span 3;
  }
}

a.btn,
span.btn {
  padding: 19px 20px;
}
span.email {
  font-family: "Ubuntu Mono", monospace;
  text-align: center;
  font-size: min(max(1rem, 5vw), 1.6em);
  padding: 5px;
}
svg {
  height: 30px;
  cursor: pointer;
  fill: #fff;
}
.service-group {
  display: inline-block;
  margin: 0 20px;
}
.service-group:hover {
  color: #000;
}
</style>
