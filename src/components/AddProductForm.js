import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { removeVietnameseTones } from "../util/numberWithComans";
import app from "../config/firebase";
import { addProduct } from "../redux/apiCall";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const categoryMale = [
  { display: "Áo thun", value: "ao-thun" },
  { display: "Áo sơmi", value: "ao-somi" },
  { display: "Áo khoác", value: "ao-khoac" },
  { display: "Áo phông", value: "ao-phôngn" },
  { display: "Áo len", value: "ao-len" },
  { display: "Áo nỉ", value: "ao-ni" },
  { display: "Áo nỉ có mũ", value: "ao-ni-co-mu" },
  { display: "Quần jean", value: "quan-jean" },
  { display: "Quần đùi", value: "quan-dui" },
  { display: "Quần âu", value: "quan-au" },
  { display: "Quần trong", value: "quan-trong" },
  { display: "Quần dài", value: "quan-dai" },
  { display: "Váy", value: "vay-lien" },
];
const categoryFemale = [
  { display: "Áo thun", value: "ao-thun" },
  { display: "Áo khoác", value: "ao-khoac" },
  { display: "Áo phông", value: "ao-phôngn" },
  { display: "Áo len", value: "ao-len" },
  { display: "Áo nỉ", value: "ao-ni" },
  { display: "Áo nỉ có mũ", value: "ao-ni-co-mu" },
  { display: "Quần jean", value: "quan-jean" },
  { display: "Quần đùi", value: "quan-dui" },
  { display: "Quần âu", value: "quan-au" },
  { display: "Quần trong", value: "quan-trong" },
];
const discount = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const colors = [
  { display: "trắng", value: "white" },
  { display: "xanh", value: "green" },
  { display: "đỏ", value: "red" },
  { display: "vàng", value: "yellow" },
  { display: "xanh dương", value: "blue" },
  { display: "đen", value: "black" },
];
const sizes = [
  { display: "S", value: "s" },
  { display: "M", value: "m" },
  { display: "L", value: "l" },
  { display: "XL", value: "xl" },
  { display: "XXL", value: "xxl" },
  { display: "XXXL", value: "xxxl" },
];

const initialInput = {
  title: "",
  desc: "",
  image01: "",
  image02: "",
  image03: "",
  size: [],
  colors: [],
  discount: 0,
  regularPrice: "",
  slugName: "",
  categorySlug: "",
  gender: [],
};

function AddProductForm(props) {
  const [inputs, setInputs] = useState(initialInput);
  const [file2, setFile2] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file3, setFile3] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const slugNames = products.map((e) => e.slugName);
  const [url, setURL] = useState([]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleGende = (e) => {
    if (e.target.value === "both") {
      setInputs((prev) => {
        return { ...prev, gender: ["male", "female"] };
      });
    } else {
      setInputs((prev) => {
        return { ...prev, gender: [e.target.value] };
      });
    }
  };

  const handleColorAndSize = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "COLOR":
          setInputs({ ...inputs, colors: [...inputs.colors, item] });
          break;
        case "SIZE":
          setInputs({ ...inputs, size: [...inputs.size, item] });
          break;
      }
    } else {
      switch (type) {
        case "COLOR":
          const newColor = inputs.colors.filter((e) => e !== item);
          setInputs({ ...inputs, colors: newColor });
          break;
        case "SIZE":
          const newSize = inputs.size.filter((e) => e !== item);
          setInputs({ ...inputs, size: newSize });
          break;
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const slugName = removeVietnameseTones(inputs.title);
    setInputs({ ...inputs, slugName: slugName });
    // handle empty input
    if (
      inputs.title === "" ||
      inputs.desc === "" ||
      inputs.regularPrice === 0 ||
      inputs.gender === [] ||
      inputs.colors === [] ||
      inputs.size === [] ||
      file1 === null ||
      file2 === null ||
      file3 === null
    ) {
      alert("Vui lòng điền đầy đủ thông tin");
    }
    // Handle duplicate product
    if (slugNames.includes(slugName)) {
      alert("Tên sản phẩm đã tồn tại");
    } else {
      // handle slugName

      const storage = getStorage(app);
      const totalFile = [file1, file2, file3];
      const promises = [];

      totalFile.map((file, index) => {
        const storageRef = ref(storage, `${slugName}-${index + 1}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        promises.push(uploadTask);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log("fail");
          },

          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                const imgName = `image0${index + 1}`;
                setInputs({ ...inputs, [imgName]: downloadURL });
              }
            );
          }
        );
      });
      Promise.all(promises)
        .then(() => {
          alert("Vui lòng đợi 5-10s để load hình ảnh lên firebase");
          addProduct(dispatch, inputs);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <form className="account__adress__form">
        {/* Title */}
        <div className="account__address__form__field ">
          <input
            className="adress__form"
            placeholder=" "
            name="title"
            onChange={handleChange}
          ></input>
          <label>Tên sản phẩm</label>
        </div>
        {/* Price */}
        <div className="account__address__form__field ">
          <input
            name="regularPrice"
            className="adress__form"
            placeholder=" "
            onChange={handleChange}
          ></input>
          <label>Giá</label>
        </div>
        {/* description */}
        <div className="account__address__form__field ">
          <input
            name="desc"
            className="adress__form"
            type="textarea"
            placeholder=" "
            onChange={handleChange}
          ></input>
          <label>Miêu tả</label>
        </div>
        <div className="checkout__addres picklocation_form">
          {/* Gender */}
          <div
            className={`picklocation_form__item ${inputs.gender ? "active" : ""}
          `}
          >
            <select
              name="gender"
              className="adress__form"
              onChange={handleGende}
            >
              <option></option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="both">Unisex</option>
            </select>
            <label>Giới tính</label>
          </div>
          {/* Categoty */}
          <div
            className={`picklocation_form__item  ${
              inputs.categorySlug ? "active" : ""
            }
          `}
          >
            <select
              name="categorySlug"
              className="adress__form"
              onChange={handleChange}
            >
              <option></option>
              {categoryMale.map((e, index) => {
                return (
                  <option
                    key={index}
                    label={e.display}
                    value={e.value}
                  ></option>
                );
              })}
            </select>
            <label>Phân loại</label>
          </div>
          {/* Discount */}
          <div
            className={`picklocation_form__item  ${
              inputs.discount ? "active" : ""
            }
          `}
          >
            <select
              name="discount"
              className="adress__form"
              onChange={handleChange}
            >
              <option></option>
              {discount.map((e, index) => {
                return <option key={index} label={e + "%"} value={e}></option>;
              })}
            </select>
            <label>Khuyến mại(%)</label>
          </div>
        </div>
        <div className="add-product___sizes__colors">
          {/* //Colors */}
          <div className="catalog__content__filter__form__option  filter-price">
            <h4>Màu sắc</h4>
            {colors.map((color, index) => {
              return (
                <div
                  key={index}
                  className="catalog__content__filter__form__option__selection"
                >
                  <input
                    type="checkbox"
                    name="color"
                    onChange={(e) =>
                      handleColorAndSize(
                        "COLOR",
                        e.target.checked,
                        e.target.value
                      )
                    }
                    value={color.value}
                  ></input>
                  <label>{color.display} </label>
                </div>
              );
            })}
          </div>
          {/* sizes */}
          <div className="catalog__content__filter__form__option">
            <h4>Size</h4>
            {sizes.map((size, index) => {
              return (
                <div
                  key={index}
                  className="catalog__content__filter__form__option__selection"
                >
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleColorAndSize(
                        "SIZE",
                        e.target.checked,
                        e.target.value
                      )
                    }
                    name="size"
                    value={size.value}
                  ></input>
                  <label>{size.display} </label>
                </div>
              );
            })}
          </div>
        </div>

        <div className="checkout__addres picklocation_form">
          {/* img1 */}
          <div className="account__address__form__field ">
            <input
              className="adress__form"
              type="file"
              onChange={(e) => {
                setFile1(e.target.files[0]);
              }}
              placeholder=" "
            ></input>
            <label>Hình ảnh sản phẩm </label>
          </div>
          {/* img 2 */}
          <div className="account__address__form__field ">
            <input
              className="adress__form"
              type="file"
              onChange={(e) => setFile2(e.target.files[0])}
              placeholder=" "
            ></input>
            <label>Hình ảnh sản phẩm </label>
          </div>
          {/* img3 */}
          <div className="account__address__form__field ">
            <input
              className="adress__form"
              type="file"
              onChange={(e) => setFile3(e.target.files[0])}
              placeholder=" "
            ></input>
            <label>Hình ảnh sản phẩm </label>
          </div>
        </div>
        <button className="save__btn" onClick={(e) => handleSave(e)}>
          Lưu
        </button>
      </form>
    </div>
  );
}

AddProductForm.propTypes = {
  type: PropTypes.string.isRequired,
};

export default AddProductForm;
