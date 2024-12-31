import { IoRestaurantOutline } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { TbCoinTakaFilled } from "react-icons/tb";
import { ImLocation2 } from "react-icons/im";
import useRole from "../../Hooks/useRole";
import useTotalRestaurant from "../../Hooks/useTotalRestaurant";
import useTotalRider from "../../Hooks/useTotalRider";
import useTotalOrdersPlaced from "../../Hooks/useTotalOrdersPlaced";
import PartnerDetails from "../PartnerDetails/PartnerDetails";
import OverviewSkeletonLoader from "../../Utilities/OverviewSkeletonLoader/OverviewSkeletonLoader";
import useTotalOrders from "../../Hooks/useTotalOrders";
import useTotalOrdersDelivered from "../../Hooks/useTotalOrdersDelivered";
import useTotalEarned from "../../Hooks/useTotalEarned";
import FoodsWeOffer from "../FoodsWeOffer/FoodsWeOffer";
import useDeliveryArea from "../../Hooks/useDeliveryArea";
import RiderActivity from "../RiderActivity/RiderActivity";
import { LuMessageSquarePlus } from "react-icons/lu";

const Overview = () => {
  let [role] = useRole();

  let [totalRestaurant, totalRestaurantLoading] = useTotalRestaurant();
  let [totalRiders, totalRidersLoading] = useTotalRider();
  let [totalOrders, totalordersLoading] = useTotalOrdersPlaced();
  let [totalOrdersPlaced, totalordersPlacedLoading] = useTotalOrders();
  let [totalOrdersDelivered, totalordersDeliveredLoading] =
    useTotalOrdersDelivered();
  let [totalEarned, totalEarnedLoading] = useTotalEarned();
  let [riderInfo, riderInfoLoading] = useDeliveryArea();

  return (
    <div className="mb-20">
      {totalRestaurantLoading ||
      totalRidersLoading ||
      totalordersLoading ||
      totalordersPlacedLoading ||
      totalordersDeliveredLoading ||
      totalEarnedLoading ||
      riderInfoLoading ? (
        <div>
          <OverviewSkeletonLoader />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 ">
          {/* Card 1 */}
          <div className="flex items-center bg-gray-200 border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-green-400">
              {role === "admin" && (
                <IoRestaurantOutline className="text-white text-[60px]" />
              )}
              {role === "restaurant-handler" && (
                <MdOutlineShoppingCartCheckout className="text-white text-[60px]" />
              )}
              {role === "rider" && (
                <ImLocation2 className="text-white text-[60px]" />
              )}
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">
                {role === "admin" && "Total Restaurants"}
                {role === "restaurant-handler" && "Total Orders Placed"}
                {role === "rider" && "Your Delivery Area"}
              </h3>
              <p className="text-3xl">
                {role === "admin" && totalRestaurant}{" "}
                {role === "restaurant-handler" && totalOrdersPlaced}
                {role === "rider" && riderInfo.region}
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center bg-gray-200 border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-green-400">
              {role === "admin" && (
                <LuMessageSquarePlus className="text-white text-[60px]" />
              )}
              {role === "restaurant-handler" && (
                <MdDeliveryDining className="text-white text-[60px]" />
              )}
              {role === "rider" && (
                <MdDeliveryDining className="text-white text-[60px]" />
              )}
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">
                {role === "admin" && "Total Subscribers"}
                {role === "restaurant-handler" && "Total Orders Delivered"}
                {role === "rider" && "Total Delivered"}
              </h3>
              <p className="text-3xl">
                {role === "admin" && totalRiders}{" "}
                {role === "restaurant-handler" && totalOrdersDelivered}
                {role === "rider" && riderInfo.totalDelivered}
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center bg-gray-200 border rounded-sm overflow-hidden shadow">
            <div className="p-4 bg-green-400">
              {role === "admin" && (
                <MdOutlineShoppingCartCheckout className="text-white text-[60px]" />
              )}
              {role === "restaurant-handler" && (
                <TbCoinTakaFilled className="text-white text-[60px]" />
              )}
              {role === "rider" && (
                <TbCoinTakaFilled className="text-white text-[60px]" />
              )}
            </div>
            <div className="px-4 text-gray-700">
              <h3 className="text-sm tracking-wider">
                {role === "admin" && "Total Orders Placed"}
                {role === "restaurant-handler" && "Total Earned"}
                {role === "rider" && "Total Earned"}
              </h3>
              <p className="text-3xl">
                {role === "admin" && totalOrders}{" "}
                {role === "restaurant-handler" && totalEarned}
                {role === "rider" && riderInfo.totalEarned}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Contents to show if the role is admin */}
      {role === "admin" && (
        <div>
          <h2 className="flex flex-row flex-nowrap items-center mt-12">
            <span className="flex-grow block border-t border-green-600"></span>
            <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-green-400 text-white">
              My Vendors
            </span>
            <span className="flex-grow block border-t border-green-600"></span>
          </h2>

          <PartnerDetails />
        </div>
      )}

      {/* Contents to show if the role is vendor/restaurant handler */}
      {role === "restaurant-handler" && (
        <div>
          <h2 className="flex flex-row flex-nowrap items-center mt-12">
            <span className="flex-grow block border-t border-green-600"></span>
            <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-green-400 text-white">
              Foods We Offer
            </span>
            <span className="flex-grow block border-t border-green-600"></span>
          </h2>
          <FoodsWeOffer />
        </div>
      )}

      {/* Contents to show if the role is rider */}
      {role === "rider" && (
        <div>
          <h2 className="flex flex-row flex-nowrap items-center mt-12">
            <span className="flex-grow block border-t border-green-600"></span>
            <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-green-400 text-white">
              Your Activity
            </span>
            <span className="flex-grow block border-t border-green-600"></span>
          </h2>
          <RiderActivity />
        </div>
      )}
    </div>
  );
};

export default Overview;
