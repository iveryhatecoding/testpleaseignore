fetch('https://testsitepleaseignore.onrender.com/api/clients')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('clients');
    data.forEach(c => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<strong>${c.first_name} ${c.last_name}</strong><br>
        Risk Assessment Due: ${c.next_periodic_risk_assessment}`;
      container.appendChild(div);
    });
  });
