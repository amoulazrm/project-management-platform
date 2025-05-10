import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil :', error);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/user/update-password',
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.success) {
        setMessage('✅ Mot de passe mis à jour avec succès');
        setNewPassword('');
      } else {
        setMessage('❌ Une erreur est survenue');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe :', error);
      setMessage('❌ Erreur serveur');
    }
  };

  if (loading) return <p>Chargement du profil...</p>;

  return (
    <div className="profile-container">
      <h2>Profil Utilisateur</h2>
      <div className="user-info">
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Rôle :</strong> {user.role}</p>
      </div>

      <form className="password-form" onSubmit={handleChangePassword}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Changer le mot de passe</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Profile;
