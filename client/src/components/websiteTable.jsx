import React from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

export default function WebsiteTable({ data, onDelete }) {
  const columns = [
    {
      path: "name",
      label: "网站名",
      content: (website) => (
        <Link to={`/websites/${website._id}`}>{website.name}</Link>
      ),
    },
    {
      path: "url",
      label: "网址",
      content: (website) => <a href={website.url}>{website.url}</a>,
    },
    {
      key: "like",
      label: "点赞",
      content: (website) => <div onClick={() => console.log("1")}>❤️</div>,
    },
    {
      key: "delete",
      label: "删除",
      content: (website) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => {
            console.log(website._id);
            onDelete(website._id);
          }}
        >
          删除
        </button>
      ),
    },
  ];
  return <Table columns={columns} data={data} />;
}
