import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"; // Import React Icons
import "react-quill/dist/quill.snow.css";

const SummarySection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [summary, setSummary] = useState(null); // Track summary content
  const [summaryId, setSummaryId] = useState(null); // Track summary ID
  const [editorContent, setEditorContent] = useState(""); // Editor content
  const [showFullSummary, setShowFullSummary] = useState(false); // Toggle for Show More/Less

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/profile/getsummary`, {
      method: "GET",
      credentials: "include", // Include credentials (cookies, HTTP authentication)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data);
        if (data.success && data.summaries.length > 0) {
          setSummaryId(data.summaries[0]._id); // Set the summary ID
          setSummary(data.summaries[0].content); // Set the first summary content
        } else {
          setSummary(null);
          setSummaryId(null);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch summary:", error);
        setSummary(null);
        setSummaryId(null);
      });
  }, []);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setEditorContent(summary || "");
  };

  const handleSave = () => {
    const url = summaryId
      ? `${import.meta.env.VITE_API_URL}/api/v1/profile/updatesummary`
      : `${import.meta.env.VITE_API_URL}/api/v1/profile/summary`;

    const method = summaryId ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        content: editorContent,
        ...(summaryId ? { summaryId } : { userId: "" }),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setSummary(editorContent);
          setIsEditing(false);
          if (!summaryId) setSummaryId(data.summary._id);
          alert(
            summaryId
              ? "Summary updated successfully"
              : "Summary saved successfully"
          );
          window.location.reload();
        }
      })
      .catch((error) => console.error("Failed to save summary:", error));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const toggleShowMore = () => {
    setShowFullSummary(!showFullSummary);
  };

  const renderSummary = () => {
    if (!summary) {
      return <p>No summary found.</p>;
    }
    if (showFullSummary) {
      return (
        <>
          <div dangerouslySetInnerHTML={{ __html: summary }} />
          <div className="flex justify-center items-center mt-4 pt-4 border-t border-gray-300">
            <button
              onClick={toggleShowMore}
              className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
            >
              Show Less <AiOutlineUp />
            </button>
          </div>
        </>
      );
    } else {
      const truncatedSummary =
        summary.split(" ").slice(0, 30).join(" ") + "...";
      return (
        <>
          <div dangerouslySetInnerHTML={{ __html: truncatedSummary }} />
          <div className="flex justify-center items-center mt-4 pt-4 border-t border-gray-300">
            <button
              onClick={toggleShowMore}
              className="text-blue-500 hover:text-blue-700 flex items-center gap-2"
            >
              Show More <AiOutlineDown />
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Summary</h3>
        <button
          onClick={handleEditClick}
          className="text-blue-500 hover:text-blue-700"
        >
          {isEditing ? "Close" : "Edit"}
        </button>
      </div>

      {!isEditing && (
        <div className="text-sm text-gray-600">{renderSummary()}</div>
      )}

      {isEditing && (
        <div className="mt-4">
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            theme="snow"
            className="mt-1 h-52"
          />
          <div className="flex justify-end space-x-2 mt-12">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummarySection;
