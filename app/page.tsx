"use client";

import { useState } from "react";
import { genTypescriptType } from "./_gen/genTypescriptType";

export default function Home() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  console.log(result);
  return (
    <main className="p-12 grid grid-cols-3 gap-4">
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium leading-6 text-gray-100 mb-2"
        >
          JSON Data
        </label>
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-0 py-1.5 text-gray-100 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fuchsia-200 sm:text-sm sm:leading-6 mb-2"
          defaultValue={""}
          style={{ fontFamily: "monospace" }}
          onChange={(e) => {
            let obj;
            try {
              obj = JSON.parse(e.target.value);
              setError("");
            } catch (e) {
              setError("Invalid JSON provided");
              return;
            }
            genTypescriptType(obj)
              .then((r) => setResult(r))
              .catch((err) => setError(err.message));
          }}
        />
        {error !== "" && <span className="text-red-200">{error}</span>}
      </div>
      {result !== "" && (
        <div>
          <span className="block text-sm font-medium leading-6 text-gray-100 mb-2">
            Result
          </span>
          <div className="overflow-hidden rounded-lg bg-gray-700 shadow">
            <div className="px-4 py-5 sm:p-6">
              {result.split("\n").map((line) => (
                <div
                  className="text-gray-100"
                  dangerouslySetInnerHTML={{
                    __html: line
                      .replace("\t", "&nbsp;")
                      .replace("  ", "&nbsp;&nbsp;"),
                  }}
                  key={line}
                  style={{ fontFamily: "monospace" }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
