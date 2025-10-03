import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Edit, Lock } from "lucide-react";
import { toast } from "sonner";
import "../styles/ProfilePage.css";
import "../styles/HomePage.css";
import type { User } from "../models/models";
import { useAppSelector } from "../../hooks";

type ProfilePageProps = {
  onUpdateUser: (user: User) => void;
  onNavigateToHome: () => void;
  onLogout: () => void;
};

export function ProfilePage({
  onUpdateUser,
  onNavigateToHome,
  onLogout,
}: ProfilePageProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user = useAppSelector((state) => state.userManagement);

  // Edit profile state
  const [editName, setEditName] = useState(user.Name);
  const [editSurname, setEditSurname] = useState(user.Surname);
  const [editEmail, setEditEmail] = useState(user.EmailAddress);
  const [editCellNumber, setEditCellNumber] = useState(user.Cellnumber);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleUpdateProfile = () => {
    if (!editName || !editSurname || !editEmail || !editCellNumber) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      onUpdateUser({
        ...user,
        Name: editName,
        Surname: editSurname,
        EmailAddress: editEmail,
        Cellnumber: editCellNumber,
      });
      setIsEditDialogOpen(false);
      setIsLoading(false);
      toast.success("Profile updated successfully!");
    }, 500);
  };

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setIsPasswordDialogOpen(false);
      setIsLoading(false);
      toast.success("Password updated successfully!");
    }, 500);
  };

  const openEditDialog = () => {
    setEditName(user.Name);
    setEditSurname(user.Surname);
    setEditEmail(user.EmailAddress);
    setEditCellNumber(user.Cellnumber);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="profile-page">
      <Navigation
        user={user}
        onNavigateToHome={onNavigateToHome}
        onLogout={onLogout}
        currentPage="profile"
      />

      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>View and manage your account information</p>
        </div>

        <div className="profile-sections">
          {/* Personal Information */}
          <div className="profile-card">
            <div className="profile-card-header">
              <div className="profile-card-title-group">
                <h3 className="profile-card-title">Personal Information</h3>
                <p className="profile-card-description">Your account details</p>
              </div>
              <button
                className="btn btn-outline btn-sm"
                onClick={openEditDialog}
              >
                <Edit />
                Edit Profile
              </button>
            </div>
            <div className="profile-card-content">
              <div className="profile-info-grid">
                <div className="profile-info-item">
                  <label className="profile-info-label">Name</label>
                  <p className="profile-info-value">{user.Name}</p>
                </div>
                <div className="profile-info-item">
                  <label className="profile-info-label">Surname</label>
                  <p className="profile-info-value">{user.Surname}</p>
                </div>
              </div>

              <div
                className="profile-info-item"
                style={{ marginTop: "1.5rem" }}
              >
                <label className="profile-info-label">Email</label>
                <p className="profile-info-value">{user.EmailAddress}</p>
              </div>

              <div
                className="profile-info-item"
                style={{ marginTop: "1.5rem" }}
              >
                <label className="profile-info-label">Cell Number</label>
                <p className="profile-info-value">{user.Cellnumber}</p>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="profile-card">
            <div className="profile-card-header">
              <div className="profile-card-title-group">
                <h3 className="profile-card-title">Security</h3>
                <p className="profile-card-description">Manage your password</p>
              </div>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setIsPasswordDialogOpen(true)}
              >
                <Lock />
                Change Password
              </button>
            </div>
            <div className="profile-card-content">
              <div className="profile-info-item">
                <label className="profile-info-label">Password</label>
                <p className="profile-info-value profile-password">••••••••</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      {isEditDialogOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsEditDialogOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Profile</h3>
              <p className="modal-description">
                Update your personal information
              </p>
            </div>

            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="editName" className="form-label">
                    Name
                  </label>
                  <input
                    id="editName"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    disabled={isLoading}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="editSurname" className="form-label">
                    Surname
                  </label>
                  <input
                    id="editSurname"
                    value={editSurname}
                    onChange={(e) => setEditSurname(e.target.value)}
                    disabled={isLoading}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="editEmail" className="form-label">
                  Email
                </label>
                <input
                  id="editEmail"
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  disabled={isLoading}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="editCellNumber" className="form-label">
                  Cell Number
                </label>
                <input
                  id="editCellNumber"
                  type="tel"
                  value={editCellNumber}
                  onChange={(e) => setEditCellNumber(e.target.value)}
                  disabled={isLoading}
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setIsEditDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="btn"
                onClick={handleUpdateProfile}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Dialog */}
      {isPasswordDialogOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsPasswordDialogOpen(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Change Password</h3>
              <p className="modal-description">Update your account password</p>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="currentPassword" className="form-label">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={isLoading}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmNewPassword" className="form-label">
                  Confirm New Password
                </label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  disabled={isLoading}
                  className="form-input"
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-outline"
                onClick={() => setIsPasswordDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="btn"
                onClick={handleUpdatePassword}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
