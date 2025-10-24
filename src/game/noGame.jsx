import React, { useEffect, useState } from 'react';

export function NoGame({
    currentUser,
    games,
    users,
    saveGames,
    setGameId,
    onCreateGame,
    onInviteAccepted,
}) {
    const [pendingInvites, setPendingInvites] = useState([]);

    useEffect(() => {
        const invites = games.filter(
            (g) =>
                g.status === 'pending' &&
                g.players.some((p) => p.username === currentUser.username && !p.accepted)
        );
        setPendingInvites(invites);
    }, [games, currentUser.username]);

    const handleAcceptInvite = (gameId) => {
        const updatedGames = games.map((g) => {
            if (g.id === gameId) {
                const updatedPlayers = g.players.map((p) =>
                    p.username === currentUser.username ? { ...p, accepted: true } : p
                );
                const allAccepted = updatedPlayers.every((p) => p.accepted);

                return {
                    ...g,
                    players: updatedPlayers,
                    status: allAccepted ? 'active' : 'pending',
                };
            }
            return g;
        });

        saveGames(updatedGames);

        setGameId(gameId);
        onInviteAccepted();
    };

    const handleDeclineInvite = (gameId) => {
        const updatedGames = games.map((g) => {
            if (g.id === gameId) {
                return {
                    ...g,
                    players: g.players.filter((p) => p.username !== currentUser.username),
                };
            }
            return g;
        });

        saveGames(updatedGames);
    };

    return (
        <div id="no-current-games">
            <h1>No Current Games</h1>

            {pendingInvites.length > 0 && (
                <div className="pending-invites">
                    <h3>Game Invitations</h3>
                    {pendingInvites.map((game) => {
                        const creator = users.find((u) => u.username === game.creator);
                        return (
                            <div key={game.id} className="request">
                                <p>
                                    <strong>{creator?.name || game.creator}</strong> invited you to
                                    play <strong>{game.name}</strong>
                                </p>
                                <button
                                    onClick={() => handleAcceptInvite(game.id)}
                                    className="btn btn-success"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleDeclineInvite(game.id)}
                                    className="btn btn-danger"
                                >
                                    Decline
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            <p>
                There are no ongoing games for you. You can start a new game, or if someone else is
                adding you to your game you can wait here.
            </p>
            <button onClick={onCreateGame} className="btn btn-primary">
                Create New Game
            </button>
        </div>
    );
}
