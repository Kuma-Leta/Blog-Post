import { Request } from "express";
import { Query } from "mongoose";

class APIFeatures {
  query: Query<any, any>;
  queryString: Request["query"];

  constructor(query: Query<any, any>, queryString: Request["query"]) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = [
      "page",
      "sortBy",
      "order",
      "limit",
      "fields",
      "search",
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  search() {
    if (this.queryString.search) {
      const searchStr = this.queryString.search as string;
      this.query = this.query.find({
        $or: [
          { name: { $regex: searchStr, $options: "i" } },
          { email: { $regex: searchStr, $options: "i" } },
        ],
      });
    }
    return this;
  }

  sort() {
    if (this.queryString.sortBy && this.queryString.order) {
      const sortBy = `${this.queryString.order === "asc" ? "" : "-"}${
        this.queryString.sortBy
      }`;
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt"); // Default sort by Date (newest first)
    }

    return this;
  }

  limit() {
    if (this.queryString.fields) {
      const fields = (this.queryString.fields as string).split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = parseInt(this.queryString.page as string, 10) || 1;
    const limit = parseInt(this.queryString.limit as string, 10) || 9;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  executeQuery() {
    return this.query;
  }
}

export default APIFeatures;
