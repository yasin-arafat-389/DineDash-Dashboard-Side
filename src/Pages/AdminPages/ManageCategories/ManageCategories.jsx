import { useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";

const ManageCategories = () => {
  const axios = useAxios();

  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editId, setEditId] = useState(null);

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allCategories"],
    queryFn: async () => {
      const res = await axios.get(`/all-category`);
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      setLoading(true);

      // Add New Category
      await axios.post("/add-category", { name: categoryName });
      toast.success("Category added successfully!");
      setCategoryName("");
      refetch();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (category) => {
    setEditCategoryName(category.name); // Prefill input with current name
    setEditId(category._id); // Set the category ID
    setOpen(true); // Open the dialog
  };

  const handleUpdateCategory = async () => {
    if (!editCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      await axios.put(`/update-category/${editId}`, { name: editCategoryName });
      toast.success("Category updated successfully!");
      refetch(); // Refresh category list
      setOpen(false); // Close the dialog
    } catch (error) {
      toast.error("Failed to update category");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await axios.delete(`/delete-category/${id}`);
      toast.success("Category deleted successfully!");
      refetch();
    } catch (error) {
      toast.error("Failed to delete category!");
      console.error(error);
    }
  };

  return (
    <div>
      {/* Title */}
      <h2 className="flex flex-row flex-nowrap items-center mt-5">
        <span className="flex-grow block border-t border-green-600"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-green-400 text-white">
          Manage Categories
        </span>
        <span className="flex-grow block border-t border-green-600"></span>
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 p-4 max-w-lg mx-auto border border-green-400 rounded"
      >
        <div className="mb-4">
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-gray-700"
          >
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Category"}
        </button>
      </form>

      {/* All Categories */}
      <h2 className="flex flex-row flex-nowrap items-center mt-10">
        <span className="flex-grow block border-t border-green-600"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-green-400 text-white">
          All Categories
        </span>
        <span className="flex-grow block border-t border-green-600"></span>
      </h2>

      <div className="mt-6 p-4 max-w-lg mx-auto border border-green-400 rounded mb-10">
        {isLoading ? (
          <p>Loading categories...</p>
        ) : data.length > 0 ? (
          <ul>
            {data.map((category) => (
              <li
                key={category._id}
                className="flex items-center justify-between p-2 border-b last:border-none"
              >
                <span>{category.name}</span>
                <div>
                  <button
                    onClick={() => handleOpen(category)}
                    className="px-2 py-1 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories found.</p>
        )}
      </div>

      {/* Edit Category Dialog */}
      <Dialog open={open} handler={() => setOpen(!open)} size="sm">
        <DialogBody>
          <label
            htmlFor="editCategoryName"
            className="block text-sm font-medium text-gray-700"
          >
            Edit Category Name
          </label>
          <input
            type="text"
            id="editCategoryName"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            placeholder="Enter new category name"
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:ring-green-500 focus:border-green-500"
          />
        </DialogBody>
        <DialogFooter>
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdateCategory}
            className="px-4 py-2 ml-2 text-white bg-green-500 rounded hover:bg-green-600 transition"
          >
            Save
          </button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ManageCategories;
