const FRUITS = [
  "Mango",
  "Banana",
  "Apple",
  "Orange",
  "Guava",
  "Aaloo",
  "Berry",
];

const inputBox = document.getElementById("search-input");
const suggestionBox = document.querySelector(".suggestions-wrapper");

const resetState = () => {
  suggestionBox.classList.remove("suggestions-visible");
};

const getSuggestions = async (keyword) => {
  const result = FRUITS.filter((i) => {
    if (keyword.length) {
      return (
        i.substring(0, keyword.length).toLowerCase() === keyword.toLowerCase()
      );
    }
  });
  return new Promise((res) => {
    setTimeout(() => {
      res(result);
    }, 1000);
  });
};

const renderDropDownItems = (list = []) => {
  const suggfragment = document.createDocumentFragment();

  list.forEach((item) => {
    const el = document.createElement("div");
    el.innerHTML = item;
    el.classList.add("dropdown-item");
    suggfragment.appendChild(el);
  });
  suggestionBox.innerHTML = "";
  suggestionBox.appendChild(suggfragment);
};
const handleSearch = async (keyword) => {
  const result = await getSuggestions(keyword);
  if (result.length) {
    suggestionBox.classList.add("suggestions-visible");
    renderDropDownItems(result);
  } else {
    resetState();
  }
  console.log(result);
};
const handleInputChange = (...events) => {
  const event = events[0];
  const value = event.target.value;
  if (value) {
    handleSearch(value);
  } else {
    resetState();
  }
};

const debounce = (cb, delay = 500) => {
  let timer;

  return function () {
    let args = arguments;
    let self = this;
    clearTimeout(timer);

    timer = setTimeout(() => {
      cb.apply(self, args);
    }, delay);
  };
};

(() => {
  inputBox.addEventListener("input", debounce(handleInputChange, 1000));
})();
