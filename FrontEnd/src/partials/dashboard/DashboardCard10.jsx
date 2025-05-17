import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa'; // Importing Font Awesome user icon

function DashboardCard10({ setSelectedPlayer }) {
  const players = [
    {
      id: '0',
      name: 'Tom Brady',
      height: '6\'4"',
      weight: '225 lbs',
      status: 'Starting',
      position: 'QB',
      attributes: [88, 95, 70, 85, 80, 90], // Speed, Strength, Throwing, Agility, Defense, Tackling
    },
    {
      id: '1',
      name: 'Derrick Henry',
      height: '6\'3"',
      weight: '247 lbs',
      status: 'Bench',
      position: 'RB',
      attributes: [82, 90, 85, 80, 85, 88],
    },
    {
      id: '2',
      name: 'Aaron Donald',
      height: '6\'1"',
      weight: '284 lbs',
      status: 'Injured',
      position: 'DT',
      attributes: [78, 93, 85, 75, 87, 90],
    },
    {
      id: '3',
      name: 'DeAndre Hopkins',
      height: '6\'1"',
      weight: '214 lbs',
      status: 'Starting',
      position: 'WR',
      attributes: [90, 88, 80, 95, 80, 85],
    },
    {
      id: '4',
      name: 'Patrick Mahomes',
      height: '6\'3"',
      weight: '230 lbs',
      status: 'Starting',
      position: 'QB',
      attributes: [92, 89, 95, 91, 84, 87],
    },
    {
      id: '5',
      name: 'Kyler Murray',
      height: '5\'10"',
      weight: '207 lbs',
      status: 'Bench',
      position: 'QB',
      attributes: [90, 80, 88, 92, 85, 85],
    },
    {
      id: '6',
      name: 'Jalen Ramsey',
      height: '6\'1"',
      weight: '208 lbs',
      status: 'Starting',
      position: 'CB',
      attributes: [80, 85, 70, 92, 90, 89],
    },
    {
      id: '7',
      name: 'Davante Adams',
      height: '6\'1"',
      weight: '215 lbs',
      status: 'Injured',
      position: 'WR',
      attributes: [95, 78, 72, 90, 80, 75],
    },
    {
      id: '8',
      name: 'Travis Kelce',
      height: '6\'5"',
      weight: '250 lbs',
      status: 'Starting',
      position: 'TE',
      attributes: [85, 90, 80, 85, 88, 80],
    },
    {
      id: '9',
      name: 'Miles Garrett',
      height: '6\'4"',
      weight: '272 lbs',
      status: 'Bench',
      position: 'DE',
      attributes: [83, 95, 72, 85, 90, 92],
    },
    {
      id: '10',
      name: 'Saquon Barkley',
      height: '6\'0"',
      weight: '234 lbs',
      status: 'Starting',
      position: 'RB',
      attributes: [92, 85, 85, 93, 88, 85],
    },
    {
      id: '11',
      name: 'Aaron Rodgers',
      height: '6\'2"',
      weight: '225 lbs',
      status: 'Starting',
      position: 'QB',
      attributes: [85, 82, 95, 80, 75, 80],
    },
    {
      id: '12',
      name: 'Russell Wilson',
      height: '5\'11"',
      weight: '215 lbs',
      status: 'Bench',
      position: 'QB',
      attributes: [87, 80, 90, 88, 75, 85],
    },
    {
      id: '13',
      name: 'Stefon Diggs',
      height: '6\'0"',
      weight: '197 lbs',
      status: 'Starting',
      position: 'WR',
      attributes: [90, 75, 80, 90, 80, 75],
    },
    {
      id: '14',
      name: 'Dante Fowler',
      height: '6\'3"',
      weight: '251 lbs',
      status: 'Starting',
      position: 'OLB',
      attributes: [78, 85, 70, 80, 92, 90],
    },
    {
      id: '15',
      name: 'Joe Burrow',
      height: '6\'4"',
      weight: '221 lbs',
      status: 'Bench',
      position: 'QB',
      attributes: [85, 80, 95, 85, 80, 78],
    },
    {
      id: '16',
      name: 'Chris Godwin',
      height: '6\'1"',
      weight: '209 lbs',
      status: 'Injured',
      position: 'WR',
      attributes: [85, 75, 80, 92, 85, 80],
    },
    {
      id: '17',
      name: 'George Kittle',
      height: '6\'4"',
      weight: '250 lbs',
      status: 'Starting',
      position: 'TE',
      attributes: [85, 90, 80, 90, 85, 85],
    },
    {
      id: '18',
      name: 'Nick Bosa',
      height: '6\'4"',
      weight: '266 lbs',
      status: 'Bench',
      position: 'DE',
      attributes: [80, 88, 75, 82, 90, 90],
    },
    {
      id: '19',
      name: 'Khalil Mack',
      height: '6\'3"',
      weight: '250 lbs',
      status: 'Injured',
      position: 'OLB',
      attributes: [90, 90, 78, 85, 90, 85],
    },
    {
      id: '20',
      name: 'DeForest Buckner',
      height: '6\'7"',
      weight: '295 lbs',
      status: 'Starting',
      position: 'DT',
      attributes: [85, 90, 80, 82, 88, 87],
    },
    {
      id: '21',
      name: 'J.J. Watt',
      height: '6\'5"',
      weight: '288 lbs',
      status: 'Bench',
      position: 'DE',
      attributes: [88, 90, 80, 78, 92, 88],
    },
    {
      id: '22',
      name: 'Kenny Clark',
      height: '6\'3"',
      weight: '314 lbs',
      status: 'Starting',
      position: 'DT',
      attributes: [80, 88, 75, 82, 85, 90],
    },
    {
      id: '23',
      name: 'Tre’Davious White',
      height: '5\'11"',
      weight: '192 lbs',
      status: 'Bench',
      position: 'CB',
      attributes: [82, 75, 75, 90, 85, 88],
    },
    {
      id: '24',
      name: 'Clyde Edwards-Helaire',
      height: '5\'7"',
      weight: '207 lbs',
      status: 'Starting',
      position: 'RB',
      attributes: [90, 80, 75, 88, 85, 75],
    },
    {
      id: '25',
      name: 'Leonard Fournette',
      height: '6\'0"',
      weight: '228 lbs',
      status: 'Starting',
      position: 'RB',
      attributes: [85, 88, 80, 80, 90, 85],
    },
    {
      id: '26',
      name: 'Mike Evans',
      height: '6\'5"',
      weight: '231 lbs',
      status: 'Bench',
      position: 'WR',
      attributes: [90, 80, 75, 88, 80, 85],
    },
    {
      id: '27',
      name: 'Chris Jones',
      height: '6\'6"',
      weight: '310 lbs',
      status: 'Starting',
      position: 'DT',
      attributes: [85, 90, 85, 82, 80, 85],
    },
    {
      id: '28',
      name: 'Javon Kinlaw',
      height: '6\'5"',
      weight: '320 lbs',
      status: 'Injured',
      position: 'DT',
      attributes: [85, 88, 70, 85, 80, 90],
    },
    {
      id: '29',
      name: 'Tyreek Hill',
      height: '5\'9"',
      weight: '185 lbs',
      status: 'Starting',
      position: 'WR',
      attributes: [95, 70, 70, 98, 85, 75],
    },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const statusColors = {
    Starting: 'bg-green-500',
    Bench: 'bg-yellow-500',
    Injured: 'bg-red-500',
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">My Players</h2>
      </header>
      <div className="p-3">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search players by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="p-2 whitespace-nowrap">Name</th>
                  <th className="p-2 whitespace-nowrap">Height</th>
                  <th className="p-2 whitespace-nowrap">Weight</th>
                  <th className="p-2 whitespace-nowrap">Status</th>
                  <th className="p-2 whitespace-nowrap">Position</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
                {filteredPlayers.map(player => (
                  <tr
                    key={player.id}
                    onClick={() => setSelectedPlayer(player)}
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3 flex items-center justify-center bg-gray-200 rounded-full">
                          <FaUser className="text-gray-600" size={24} />
                        </div>
                        <div className="font-medium text-gray-800 dark:text-gray-100">{player.name}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">{player.height}</td>
                    <td className="p-2 whitespace-nowrap">{player.weight}</td>
                    <td className="p-2 whitespace-nowrap">
                      <span className={`py-1 px-2 rounded-full text-xs font-medium text-gray-800 ${statusColors[player.status]}`}>{player.status}</span>
                    </td>
                    <td className="p-2 whitespace-nowrap">{player.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard10;