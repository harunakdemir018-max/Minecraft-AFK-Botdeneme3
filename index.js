const http = require('http');

// Render'ın kapanmaması için mini HTTP sunucusu
http.createServer((req, res) => {
  res.write("AFK Botu 7/24 Aktif!");
  res.end();
}).listen(process.env.PORT || 3000);

const mineflayer = require('mineflayer');

const botOptions = {
  host: 'oyna.wrus.net  // Örn: sunucun.aternos.me
  port: 25565,               // Portun varsa değiştir, yoksa 25565
  username: 'txcpsych724',    
  version: '1.20.1'          
};

function createBot() {
  const bot = mineflayer.createBot(botOptions);

  bot.on('spawn', () => {
    console.log('Bot sunucuya başarıyla bağlandı!');

    // 1. ADIM: 3. saniyede ilk şifre
    setTimeout(() => {
      bot.chat('1122334455harun'); 
    }, 3000);

    // 2. ADIM: 6. saniyede ikinci şifre
    setTimeout(() => {
      bot.chat('1122334455harun'); 
    }, 6000);

    // 3. ADIM: 9. saniyede Gmail adresi
    setTimeout(() => {
      bot.chat('harun123455789pp@gmail.com'); 
    }, 9000);

    // 4. ADIM: 12. saniyede 5. slottaki pusulayı kullanma
    setTimeout(async () => {
      try {
        const slotIndex = 4; // 5. slot (Index 0'dan başladığı için 4)
        const item = bot.inventory.slots[slotIndex];
        
        if (item) {
          await bot.equip(item, 'hand');
          bot.activateItem();
          console.log('5. slottaki pusula kullanıldı!');
        } else {
          console.log('5. slotta eşya yok!');
        }
      } catch (err) {
        console.log('Pusula hatası:', err);
      }
    }, 12000);

    // 5. ADIM: 15. saniyede menüden 21. slota tıklama (Survival)
    setTimeout(() => {
      try {
        const survivalSlot = 20; // 21. slot (Index 20)
        
        if (bot.currentWindow) {
          bot.clickWindow(survivalSlot, 0, 0);
          console.log('Survival seçildi!');
        } else {
          console.log('Menü açık değil!');
        }
      } catch (err) {
        console.log('Menü hatası:', err);
      }
    }, 15000);

    // 6. ADIM: 19. saniyede AFK alanına gitme
    setTimeout(() => {
      bot.chat('/warp afk');
      console.log('/warp afk komutu gönderildi!');
    }, 19000);

  });

  // Zıplama mekanizması
  bot.on('spawn', () => {
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => {
        bot.setControlState('jump', false);
      }, 500);
    }, 60000);
  });

  // Yeniden bağlanma
  bot.on('end', () => {
    console.log('Bağlantı koptu, tekrar deneniyor...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', err => console.log('Hata:', err));
}

createBot();
