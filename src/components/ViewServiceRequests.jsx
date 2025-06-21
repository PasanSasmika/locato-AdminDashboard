import axios from "axios";
import { useEffect, useState } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaIdCard, 
  FaMapMarkerAlt, 
  FaFilter, 
  FaSearch, 
  FaCheckCircle,
  FaExclamationCircle,
  FaUsers,
  FaHome,
  FaSync
} from "react-icons/fa";

function ViewServiceRequests() {
  const [pageStatus, setPageStatus] = useState("loading");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("all");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "api/service/serviceReq")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setPageStatus("loaded");
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setPageStatus("error");
      });
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = users;

    // Filter by service type
    if (selectedService !== "all") {
      filtered = filtered.filter((user) => user.serviceType === selectedService);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.serviceType.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedService]);

  // Get unique service types for filter
  const serviceTypes = [...new Set(users.map((user) => user.serviceType))];

  // Get service type color
  const getServiceColor = (serviceType) => {
    const colors = {
      Electrician: "bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900",
      Plumber: "bg-gradient-to-r from-blue-400 to-blue-500 text-blue-900",
      Carpenter: "bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900",
      Cleaner: "bg-gradient-to-r from-green-400 to-green-500 text-green-900",
      Mechanic: "bg-gradient-to-r from-gray-400 to-gray-500 text-gray-900",
      default: "bg-gradient-to-r from-purple-400 to-purple-500 text-purple-900",
    };
    return colors[serviceType] || colors.default;
  };

  if (pageStatus === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-primary">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 font-secondary">Loading Service Requests</h2>
            <p className="text-gray-600">Please wait while we fetch the latest data...</p>
            <div className="flex justify-center mt-4 space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pageStatus === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 font-primary">
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
          <div className="relative mb-8">
            <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg">
              <FaExclamationCircle size={48} className="text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-200 rounded-full animate-ping"></div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 font-secondary">Oops! Something went wrong</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md">
            We couldn't load the service requests. This might be a temporary issue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
              onClick={() => window.location.reload()}
            >
              <FaSync className="inline mr-2" />
              Try Again
            </button>
            <button
              className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:bg-gray-50 transform hover:scale-105 transition-all duration-200"
              onClick={() => (window.location.href = "/")}
            >
              <FaHome className="inline mr-2" />
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-primary">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center mb-6 lg:mb-0">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl shadow-lg mr-4">
                <FaUsers size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-secondary">Service Requests</h1>
                <p className="text-gray-600 mt-1">
                  Manage and review all service applications ({filteredUsers.length} total)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by name, email, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Service Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white min-w-[180px]"
              >
                <option value="all">All Services</option>
                {serviceTypes.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
              <FaCheckCircle className="mr-2 text-green-500" />
              {filteredUsers.length} results found
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredUsers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredUsers.map((user) => (
              <div
                key={user._id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <FaUser className="text-white text-xl" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-white font-secondary">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-gray-300 text-sm">Service Provider</p>
                      </div>
                    </div>
                  </div>

                  {/* Service Badge */}
                  <div className="mt-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getServiceColor(
                        user.serviceType,
                      )}`}
                    >
                      {user.serviceType}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm">
                      <FaEnvelope className="text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-700 truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FaPhone className="text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{user.mobileNo}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FaIdCard className="text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{user.nic}</span>
                    </div>
                    <div className="flex items-start text-sm">
                      <FaMapMarkerAlt className="text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 line-clamp-2">{user.address}</span>
                    </div>
                  </div>

                  {/* Profile Image */}
                  {user.Images && (
                    <div className="mt-4">
                      <img
                        src={user.Images || "/placeholder.svg"}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-full h-48 object-cover rounded-xl border border-gray-200"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers size={28} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 font-secondary">No service requests found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedService !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "There are currently no service requests to display."}
              </p>
              {(searchTerm || selectedService !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedService("all");
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewServiceRequests;