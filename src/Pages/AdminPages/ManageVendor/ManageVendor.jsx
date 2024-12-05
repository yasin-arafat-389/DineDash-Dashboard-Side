import { useQuery } from "@tanstack/react-query";
import { Button } from "@material-tailwind/react";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

const ManageVendor = () => {
  const axios = useAxios();

  // Fetch all blacklisted restaurants
  const {
    data: blacklistedVendors = [],
    isLoading: isblacklistedLoading,
    refetch,
  } = useQuery({
    queryKey: ["blacklistedVendors"],
    queryFn: async () => {
      const response = await axios.get("/blacklist/list");
      return response.data;
    },
  });

  // Fetch all restaurants
  const { data: vendors = [], isLoading } = useQuery({
    queryKey: ["allVendorRestaurants"],
    queryFn: async () => {
      const response = await axios.get("/restaurants");

      return response.data;
    },
  });

  const handleBlacklist = (name) => {
    Swal.fire({
      title: ` ${
        blacklistedVendors.some(
          (blacklistedVendor) => blacklistedVendor.restaurant === name
        )
          ? "Are you sure you want to remove this vendor from blacklist?"
          : "Are you sure you want to blacklist this vendor?"
      }`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("/blacklist/vendor", { restaurant: name }).then((res) => {
          refetch();

          Swal.fire({
            text: `${res.data.message}`,
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold text-center mb-5">Manage Vendors</h2>

      {isLoading || isblacklistedLoading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : vendors.length === 0 ? (
        <div className="text-center text-lg text-gray-600">
          No vendors found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Restaurant Name</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor._id}>
                  <td className="border border-gray-300 p-2">{vendor.name}</td>
                  <td className="border border-gray-300 p-2">
                    {blacklistedVendors.some(
                      (blacklistedVendor) =>
                        blacklistedVendor.restaurant === vendor.name
                    )
                      ? "Blacklisted"
                      : "Active"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <Button
                      onClick={() => handleBlacklist(vendor.name)}
                      size="sm"
                    >
                      {blacklistedVendors.some(
                        (blacklistedVendor) =>
                          blacklistedVendor.restaurant === vendor.name
                      )
                        ? "Remove from blacklist"
                        : "Blacklist"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageVendor;
