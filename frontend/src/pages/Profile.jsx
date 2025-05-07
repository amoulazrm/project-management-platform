import { useState, useEffect } from 'react';
import './profile.css';

function Profile() {
  const [user, setUser] = useState({});
  const [newPassword, setNewPassword] = useState('');
  
  useEffect(() => {
    // Récupérer les informations de l'utilisateur via l'API
    // fetch('/api/user', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
    //   .then(res => res.json())
    //   .then(data => setUser(data));
  }, []);

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Appel à l'API pour modifier le mot de passe
    // fetch('/api/update-password', {
    //   method: 'PUT',
    //   body: JSON.stringify({ newPassword }),
    //   headers: { 'Content-Type': 'application/json' },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data.success) {
    //       alert('Mot de passe mis à jour avec succès');
    //     }
    //   });
  };

  return (
    <div className="profile-container">
      <h2>Profil Utilisateur</h2>
      <div>
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Rôle :</strong> {user.role}</p>
      </div>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit">Changer le mot de passe</button>
      </form>
    </div>
  );
}

export default Profile;
