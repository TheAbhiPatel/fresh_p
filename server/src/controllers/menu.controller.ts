import { Request, RequestHandler, Response } from "express";
import { menuModel } from "../models/menu.model";
import { catModel } from "../models/category.model";
import { subCatModel } from "../models/subCategory.model";
import { menuMessage } from "../utils/responseMessage";

export const getAllMenus: RequestHandler = async (req, res, next) => {
  const user = res.locals.user;
  try {
    const menu = await menuModel.find({ userId: user.id });
    if (menu.length == 0)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menuNotFound });
    const category = await catModel.find({ userId: user.id });
    if (category.length == 0)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menuNotFound });
    const subCategory = await subCatModel.find({ userId: user.id });
    if (subCategory.length == 0)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menuNotFound });
    res.status(200).json({
      success: true,
      message: menuMessage.menuFetched,
      menu,
      category,
      subCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const getMenu: RequestHandler = async (req, res, next) => {
  const user = res.locals.user;
  const menuId = req.params.id;
  try {
    const menu = await menuModel.find({ userId: user.id, _id: menuId });

    if (menu.length == 0)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menuNotFound });
    const category = await catModel.find({ userId: user.id, menuId });
    if (category.length == 0)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menuNotFound });
    const subCategory = await subCatModel.find({ userId: user.id, menuId });
    if (subCategory.length == 0)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menuNotFound });
    res.status(200).json({
      success: true,
      message: menuMessage.menuFetched,
      menu,
      category,
      subCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const postMenu: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user.id;
  const body: any = req.body?.previewData;
  // const body: any = req.body;
  // console.log(body);
  // return res.json({ message: "please wait" });

  try {
    const { menu, category, subCategory, ...all } = body;
    const savedMenu: any[] = [];

    for (let i = 0; i < menu.length; i++) {
      const { name, connectId, isProtected, selected, label, password, value } =
        menu[i];
      const newMenu = await menuModel.create({
        userId,
        connectId,
        name,
        label,
        value,
        password,
        isProtected,
        selected,
      });

      savedMenu.push(newMenu);
    }
    // ---------------------- category------------------------------

    const savedCat = savedMenu.map(async (oneMenu: any) => {
      const menuId = oneMenu._id;

      const categories = category.filter(
        (cat: any) => cat.connectMenuId == oneMenu.connectId
      );

      const promises = categories.map(function (item: any) {
        const { name, selected, connectId, connectMenuId, label, value } = item;
        return catModel
          .create({
            userId,
            menuId,
            connectId,
            connectMenuId,
            name,
            selected,
            label,
            value,
          })
          .then(function (results) {
            return results;
          });
      });
      const promiseArray = await Promise.all(promises).then(function (results) {
        return results;
      });
      return promiseArray;
    });

    const savedCategory = await Promise.all(savedCat).then(function (results) {
      return results;
    });

    // --------------------- sub category-------------------------------

    const saveSubCategories = savedCategory.flat().map(async (item: any) => {
      const { menuId, _id, connectId } = item;
      const oneSubCategories = subCategory.filter(
        (subCat: any) => subCat.connectCategoryId == connectId
      );

      const { subcategories, connectMenuId, connectCategoryId } =
        oneSubCategories[0];

      const saveSubCatPromise = subcategories.map(function (item: any) {
        const { name, connectId, label, value } = item;
        return subCatModel
          .create({
            userId,
            menuId,
            categoryId: _id,
            connectId,
            connectMenuId,
            connectCategoryId,
            name,
            label,
            value,
          })
          .then(function (results) {
            return results;
          });
      });
      const promiseArray = await Promise.all(saveSubCatPromise).then(function (
        results
      ) {
        return results;
      });
    });

    res.status(201).json({
      success: true,
      message: menuMessage.menuAdded,
      savedMenu,
      savedCategory,
    });
  } catch (error) {
    next(error);
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const updateMenu: RequestHandler = async (req, res, next) => {
  const userId = res.locals.user.id;
  const body = req.body;

  try {
    const { menu, category, subCategory, ...all } = body;
    const savedMenu: any[] = [];

    for (let i = 0; i < menu.length; i++) {
      const { _id, name, isProtected, selected, label, password, value } =
        menu[i];
      const newMenu = await menuModel.findByIdAndUpdate(
        { _id },
        {
          name,
          label,
          value,
          password,
          isProtected,
          selected,
        }
      );
    }
    // ---------------------- category------------------------------
    for (let i = 0; i < category.length; i++) {
      const { _id, name, selected, label, value } = category[i];
      const newCat = await catModel.findByIdAndUpdate(
        { _id },
        {
          name,
          selected,
          label,
          value,
        }
      );
    }

    // --------------------- sub category-------------------------------
    for (let i = 0; i < subCategory.length; i++) {
      const { subcategories } = subCategory[i];
      const saveSubCatPromise = subcategories.map(function (item: any) {
        const { _id, name, label, value } = item;
        return subCatModel
          .findByIdAndUpdate(
            { _id },
            {
              name,
              label,
              value,
            }
          )
          .then(function (results) {
            return results;
          });
      });
    }

    res.status(201).json({
      success: true,
      message: menuMessage.menuUpdated,
    });
  } catch (error) {
    next(error);
  }
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const deleteMenu: RequestHandler = async (req, res, next) => {
  const user = res.locals.user;
  const menuId = req.params.id;
  try {
    const menu = await menuModel.findByIdAndDelete({
      userId: user.id,
      _id: menuId,
    });

    if (!menu)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menuNotFound });
    const category = await catModel.deleteMany({
      userId: user.id,
      menuId,
    });

    if (!category)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menuNotFound });
    const subCategory = await subCatModel.deleteMany({
      userId: user.id,
      menuId,
    });

    if (!subCategory)
      return res
        .status(404)
        .json({ success: false, message: menuMessage.menuNotFound });
    res.status(200).json({
      success: true,
      message: menuMessage.menuDeleted,
      menu,
      category,
      subCategory,
    });
  } catch (error) {
    next(error);
  }
};
