import Swal from "sweetalert2";
import { ImSpinner9 } from "react-icons/im";
import useAxios from "../../../Hooks/useAxios";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const ManageSubscribers = () => {
  let axios = useAxios();

  let {
    data = [],
    isLoading: isSubscribersLoading,
    refetch,
  } = useQuery({
    queryKey: ["allTheSubscribers"],
    queryFn: async () => {
      let res = await axios.get(`/subscribers`).then();
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("/delete-subscription", {
            data: { id },
          })
          .then(() => {
            toast.success("Removed from subscription!!");
            refetch();
          });

        console.log(id);
      }
    });
  };

  return (
    <div>
      <h2 className="flex flex-row flex-nowrap items-center mt-5">
        <span className="flex-grow block border-t border-green-600"></span>
        <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-green-400 text-white">
          Manage Subscribers
        </span>
        <span className="flex-grow block border-t border-green-600"></span>
      </h2>

      {/* Loader */}
      {isSubscribersLoading ? (
        <div className="flex justify-center items-center mt-10">
          <ImSpinner9 className="text-green-400 text-4xl animate-spin" />
        </div>
      ) : (
        // Table
        <div className="mt-8 overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-green-500 text-left text-sm">
            <thead className="bg-green-400 text-white">
              <tr>
                <th className="border border-green-500 px-4 py-2 text-xl">
                  Email
                </th>
                <th className="border border-green-500 px-4 py-2 text-xl">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((subscriber, index) => (
                  <tr
                    key={subscriber.id || index}
                    className="odd:bg-white even:bg-gray-100"
                  >
                    <td className="border border-green-500 px-4 py-2 text-lg">
                      {subscriber.email}
                    </td>

                    <td className="border border-green-500 px-4 py-2">
                      <button
                        onClick={() => handleDelete(subscriber._id)}
                        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-lg"
                      >
                        Delete From Subscription
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border border-green-500 px-4 py-4 text-center text-gray-500"
                  >
                    No Subscribers Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageSubscribers;
