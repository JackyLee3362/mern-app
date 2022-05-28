import React, { useState } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

export default function WebsiteTable({ data, onDelete, onLike }) {
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
      path: "like",
      label: "点赞数",
      content: (website) => (
        <div>
          <button
            key={"like" + website._id}
            className="btn"
            onClick={() => onLike(website)}
          >
            ❤️
          </button>
          <span>{website.like}</span>
        </div>
      ),
    },
    {
      key: "delete",
      label: "删除",
      content: (website) => (
        <button
          className="btn btn-sm"
          onClick={() => {
            onDelete(website._id);
          }}
        >
          🗑
        </button>
      ),
    },
  ];
  return <Table columns={columns} data={data} />;
}
