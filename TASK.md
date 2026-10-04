Bisa. Saya buat versi **poker sebagai game hiburan berbasis chip virtual saja**—tanpa deposit, withdraw, cash-out, atau uang nyata—supaya fokusnya tetap pada gameplay, multiplayer, bot, dan desain produknya.

Buat sebuah web application game **Texas Hold’em Poker** modern bernama sementara **Neon Poker** menggunakan **Next.js**, dengan mode **offline**, **multiplayer online**, dan **lawan bot/AI**.

Game ini harus menggunakan **virtual chips / play money only**.

Jangan implementasikan:

- deposit uang asli
- withdraw
- cash-out
- cryptocurrency wagering
- NFT wagering
- pembelian chip yang dapat ditukar kembali menjadi uang
- hadiah bernilai uang
- mekanisme perjudian uang nyata

Semua chip di dalam aplikasi hanya merupakan **poin virtual untuk gameplay** dan tidak memiliki nilai moneter.

Aplikasi harus memiliki desain modern, colorful, premium, responsive, mobile-friendly, dan siap dideploy ke **Vercel**.

---

# 1. Tujuan Produk

Bangun sebuah game Texas Hold’em Poker berbasis web yang benar-benar playable dan terasa seperti produk game multiplayer production-ready.

Mode permainan:

1. **Play vs Bots**
2. **Local Practice**
3. **Private Online Room**
4. **Online Multiplayer**
5. **Mixed Table**
   - human players
   - bot players

Game harus dapat dimainkan dengan:

```text
2–8 pemain
```

Default recommended:

```text
2–6 pemain
```

---

# 2. Game Variant

Gunakan:

```text
Texas Hold’em Poker
```

Setiap pemain mendapat:

```text
2 hole cards
```

Community cards:

```text
Flop: 3
Turn: 1
River: 1
```

Urutan permainan:

```text
Pre-Flop
↓
Flop
↓
Turn
↓
River
↓
Showdown
```

---

# 3. Technology Stack

Gunakan:

- Next.js versi terbaru
- App Router
- TypeScript
- React
- Tailwind CSS
- shadcn/ui jika diperlukan
- Lucide React
- Framer Motion
- Zustand jika state game cukup kompleks

Multiplayer backend:

```text
Supabase
```

Gunakan:

- PostgreSQL
- Supabase Realtime
- Supabase Auth optional
- Row Level Security
- server-side validation

Deployment:

```text
Vercel
```

Arsitektur harus kompatibel dengan serverless.

Jangan bergantung pada always-running Node.js WebSocket server.

---

# 4. Branding

Gunakan nama sementara:

```text
Neon Poker
```

Alternatif:

```text
Pocket Kings
River Club
AceTable
Card Arena
Royal Table
```

Jangan menggunakan:

- logo casino nyata
- branding platform poker lain
- copyrighted table assets

Buat visual identity original.

---

# 5. Visual Direction

Gunakan gaya:

```text
modern
premium
colorful
gaming
clean
slightly futuristic
```

Hindari tampilan casino klasik yang terlalu gelap atau penuh ornamen.

Gunakan background utama:

```text
#07111F
```

Surface:

```text
#111C2E
```

Accent:

```text
Cyan
Purple
Blue
Emerald
Orange
```

Contoh:

```text
Cyan: #22D3EE
Purple: #8B5CF6
Blue: #3B82F6
Emerald: #10B981
Orange: #F97316
```

Gunakan gradient hanya untuk:

- CTA
- current turn
- winner state
- premium decorative elements

---

# 6. Poker Table

Table menjadi focal point.

Gunakan bentuk:

```text
oval poker table
```

Modern visual:

```text
dark emerald / blue felt
soft border glow
clean chip stacks
minimal decoration
```

Desktop:

```text
              Player 3

      Player 2        Player 4


          Community Cards

          Pot: 1,240


      Player 1        Player 5

                You
```

---

# 7. Mobile Layout

Mobile adalah prioritas.

Target:

```text
320px
375px
390px
430px
```

Layout harus tetap nyaman.

Contoh:

```text
Opponent Seats

Community Cards

Pot

Your Cards

Your Chips

Actions
```

Gunakan compact player seat.

Jangan membuat table terlalu lebar sampai horizontal scroll.

---

# 8. Poker Cards

Buat card component original.

Card design:

- rounded corners
- clear rank
- clear suit
- high contrast

Suit:

```text
♠
♥
♦
♣
```

Rank:

```text
2–10
J
Q
K
A
```

Gunakan design minimal modern.

---

# 9. Deck

Gunakan standard deck:

```text
52 cards
```

Tanpa Joker.

Data model:

```ts
type Suit =
  | "spades"
  | "hearts"
  | "diamonds"
  | "clubs";

type Rank =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

type PlayingCard = {
  id: string;
  rank: Rank;
  suit: Suit;
};
```

---

# 10. Shuffle

Gunakan secure shuffle untuk game online.

Jangan gunakan:

```ts
array.sort(() => Math.random() - 0.5)
```

Untuk offline:

gunakan Fisher-Yates.

Untuk online authoritative game:

gunakan cryptographically secure random source di server.

Contoh:

```text
crypto.getRandomValues
```

atau secure server-side equivalent.

---

# 11. Game Setup

Setiap match:

```text
Create deck
↓
Shuffle
↓
Determine dealer
↓
Assign blinds
↓
Deal 2 hole cards
↓
Start pre-flop
```

Dealer berpindah satu seat setiap hand.

---

# 12. Blind System

Implementasikan:

```text
Small Blind
Big Blind
```

Example:

```text
Small Blind: 10
Big Blind: 20
```

Untuk play-money game, blinds adalah virtual points saja.

Room settings:

```text
10 / 20
25 / 50
50 / 100
```

Tidak ada nilai mata uang asli.

---

# 13. Player Starting Chips

Gunakan virtual chips.

Default:

```text
2,000 chips
```

atau:

```text
100 Big Blinds
```

Contoh:

```text
Blinds: 10 / 20
Starting Chips: 2,000
```

Chips tidak dapat:

- dibeli dengan uang asli
- diuangkan
- ditransfer menjadi aset nyata

---

# 14. Betting Actions

Implementasikan:

```text
Fold
Check
Call
Bet
Raise
All-In
```

Buttons harus contextual.

Jika player bisa Check:

```text
[Check]
[Bet]
```

Jika ada bet:

```text
[Fold]
[Call 120]
[Raise]
```

---

# 15. Bet Slider

Untuk Bet dan Raise:

Tambahkan slider.

Contoh:

```text
Bet Amount

[ 100 ---------------- 1200 ]

½ Pot
¾ Pot
Pot
All-In
```

Quick buttons:

```text
33%
50%
75%
100%
All-In
```

Pastikan nilai minimum raise benar.

---

# 16. Betting Rules

Implementasikan rule Texas Hold’em dengan benar.

Validasi:

- minimum bet
- minimum raise
- call amount
- check availability
- all-in
- short stack
- action order
- betting round completion

Player tidak boleh:

- check ketika ada outstanding bet
- bet di bawah minimum kecuali all-in
- memainkan turn pemain lain

---

# 17. Action Order

Pre-flop:

Action dimulai dari pemain setelah big blind.

Post-flop:

Action dimulai dari active player pertama setelah dealer.

Handle:

- folded players
- all-in players
- disconnected players

---

# 18. Street System

Gunakan:

```ts
type Street =
  | "preflop"
  | "flop"
  | "turn"
  | "river"
  | "showdown";
```

Flow:

```text
PRE-FLOP
↓
FLOP
↓
TURN
↓
RIVER
↓
SHOWDOWN
```

---

# 19. Community Cards

Center table menampilkan:

Pre-flop:

```text
[ ][ ][ ][ ][ ]
```

Flop:

```text
[A♠][10♥][7♣][ ][ ]
```

Turn:

```text
[A♠][10♥][7♣][3♦][ ]
```

River:

```text
[A♠][10♥][7♣][3♦][K♠]
```

Gunakan animasi deal.

---

# 20. Hole Cards

Player hanya dapat melihat:

```text
own hole cards
```

Contoh:

```text
[A♠] [K♠]
```

Hole cards lawan:

```text
[card back] [card back]
```

Sampai showdown.

---

# 21. Hidden Card Security

Sangat penting untuk multiplayer.

Jangan pernah broadcast seluruh hole cards kepada semua client.

Player hanya boleh menerima:

```text
own hole cards
```

Public state hanya berisi:

- community cards
- chip stacks
- pot
- current action
- folded status
- all-in status

Hole cards player lain harus tetap server-side.

---

# 22. Hand Ranking

Implementasikan ranking:

```text
1. Royal Flush
2. Straight Flush
3. Four of a Kind
4. Full House
5. Flush
6. Straight
7. Three of a Kind
8. Two Pair
9. One Pair
10. High Card
```

Catatan:

Secara internal Royal Flush dapat diperlakukan sebagai Straight Flush tertinggi.

---

# 23. Hand Evaluator

Gunakan evaluator hand yang akurat.

Boleh:

- implement sendiri dengan unit tests yang kuat
- gunakan library poker evaluator terpercaya

Evaluator menerima:

```text
2 hole cards
+
5 community cards
```

Pilih best 5-card combination.

---

# 24. Tie Breakers

Implementasikan tie-break dengan benar.

Contoh:

Pair:

```text
pair rank
↓
highest kicker
↓
second kicker
↓
third kicker
```

Two Pair:

```text
highest pair
↓
second pair
↓
kicker
```

Full House:

```text
three-of-kind rank
↓
pair rank
```

Flush:

bandingkan kartu tertinggi berurutan.

Straight:

bandingkan highest card.

Support:

```text
A-2-3-4-5
```

sebagai five-high straight.

---

# 25. Showdown

Jika lebih dari satu pemain tersisa setelah river:

```text
SHOWDOWN
```

Reveal hole cards pemain yang eligible.

Highlight winning hand.

Contoh:

```text
Alex

A♠ K♠

Royal Flush

WINNER
+3,420 chips
```

---

# 26. Pot System

Tampilkan pot:

```text
POT

1,240
```

Update setelah setiap action.

Pastikan chip calculation akurat.

---

# 27. Side Pots

Wajib support side pots.

Contoh:

```text
Player A: 500
Player B: 1,000
Player C: 2,000
```

Jika A all-in:

buat:

```text
Main Pot
Side Pot 1
Side Pot 2
```

Setiap pot hanya bisa dimenangkan oleh player yang berkontribusi ke pot tersebut.

---

# 28. All-In Handling

Jika pemain All-In:

Status:

```text
ALL-IN
```

Player tidak melakukan action lagi.

Jika semua remaining players all-in:

otomatis run out remaining community cards.

---

# 29. Fold

Jika fold:

- cards hidden
- player tidak eligible untuk memenangkan pot
- player tetap berada di seat sampai hand berikutnya

Visual:

```text
FOLDED
```

Kurangi opacity seat.

---

# 30. Player State

Contoh:

```ts
type PokerPlayer = {
  id: string;
  name: string;
  seat: number;

  chips: number;

  currentBet: number;

  folded: boolean;

  allIn: boolean;

  connected: boolean;

  isBot: boolean;
};
```

---

# 31. Main Game State

Contoh:

```ts
type PokerGameState = {
  id: string;

  status:
    | "waiting"
    | "playing"
    | "finished";

  street:
    | "preflop"
    | "flop"
    | "turn"
    | "river"
    | "showdown";

  players: PokerPlayer[];

  communityCards: PlayingCard[];

  pot: number;

  dealerSeat: number;

  smallBlindSeat: number;

  bigBlindSeat: number;

  currentPlayerSeat: number;

  currentBet: number;

  minimumRaise: number;

  handNumber: number;

  version: number;
};
```

---

# 32. Bot Mode

User dapat memilih:

```text
1 Human
+
1–5 Bots
```

Difficulty:

```text
Beginner
Normal
Advanced
```

Bot tidak boleh mengetahui hole cards lawan.

---

# 33. Beginner Bot

Beginner bot:

- mostly random valid decisions
- folds weak hands
- calls small bets
- occasionally raises

Tidak perlu advanced poker strategy.

---

# 34. Normal Bot

Gunakan kombinasi:

- pre-flop hand strength
- pot odds sederhana
- hand strength
- board texture
- opponent bet size

Decision:

```text
Fold
Check
Call
Raise
```

Tambahkan randomization agar bot tidak terlalu predictable.

---

# 35. Advanced Bot

Gunakan rule-based strategy yang lebih baik.

Pertimbangkan:

- hand equity estimate
- pot odds
- position
- effective stack
- bet sizing
- board texture
- opponent behavior sederhana

Bot tetap tidak boleh mengetahui hidden information.

Jangan menggunakan cheating AI.

---

# 36. Bot Thinking

Tampilkan:

```text
Nova is thinking...
```

Delay visual:

```text
500ms–1500ms
```

Jangan freeze UI.

Logic bot dapat berjalan async.

---

# 37. Offline Mode

Offline mendukung:

```text
You vs Bots
```

Tidak perlu backend.

Semua logic berjalan client-side.

Jika user offline:

```text
Offline Mode
```

Online Multiplayer dinonaktifkan dengan message:

```text
Internet connection required for online tables.
```

---

# 38. Local Practice

Tambahkan mode:

```text
Practice Table
```

Player melawan beberapa bots.

User bisa menentukan:

```text
Bot Count
Difficulty
Starting Chips
Blind Level
```

---

# 39. Online Multiplayer

Flow:

```text
Play Online
↓
Create Private Table
OR
Join Table
```

Private table:

```text
Room Name

Max Players:
2–8

Starting Chips:
1000
2000
5000

Blinds:
10/20
25/50
50/100

Bots:
0–6
```

---

# 40. Room Code

Generate code:

```text
PKR-X7P9
```

atau:

```text
A7K9Q2
```

Lobby:

```text
PRIVATE TABLE

Code:
A7K9Q2

[Copy Code]

[Copy Invite Link]
```

---

# 41. Lobby

Example:

```text
ROYAL TABLE

1. You        READY
2. Alex       READY
3. Nova       BOT
4. Waiting...
5. Waiting...
6. Waiting...

Blinds:
10 / 20

Starting Chips:
2,000

[START GAME]
```

---

# 42. Ready State

Player dapat:

```text
Ready
Not Ready
```

Host dapat mulai jika minimum:

```text
2 active players
```

Optional:

```text
Require all humans ready
```

Default:

```text
ON
```

---

# 43. Guest Mode

Login tidak wajib.

Generate:

```text
Guest4821
```

Simpan identity di:

```text
localStorage
```

Player dapat set:

- display name
- avatar

Optional authentication:

```text
Google
Email Magic Link
```

---

# 44. Player Avatar

Gunakan avatar playful:

```text
🦊
🐼
🐯
🐸
🤖
👾
🦁
🐧
```

atau custom abstract avatar.

---

# 45. Online Game Authority

Server harus authoritative.

Client hanya mengirim action:

```ts
type PokerAction =
  | {
      type: "fold";
    }
  | {
      type: "check";
    }
  | {
      type: "call";
    }
  | {
      type: "bet";
      amount: number;
    }
  | {
      type: "raise";
      amount: number;
    }
  | {
      type: "all_in";
    };
```

Server melakukan:

```text
validate player
↓
validate turn
↓
validate action
↓
validate amount
↓
update chips
↓
update pot
↓
determine next player
↓
advance street if needed
```

---

# 46. Security

Jangan percaya client.

Server harus memvalidasi:

- player identity
- room membership
- player seat
- current turn
- chip balance
- current bet
- minimum raise
- fold status
- all-in status

Jangan expose deck order.

Jangan expose hole cards lawan.

---

# 47. Database

Jika menggunakan Supabase:

## rooms

```text
id
room_code
host_id
status
max_players
starting_chips
small_blind
big_blind
created_at
updated_at
```

## players

```text
id
room_id
user_id
seat
display_name
chips
is_bot
connected
ready
created_at
```

## games

```text
id
room_id
hand_number
street
dealer_seat
small_blind_seat
big_blind_seat
current_player_seat
pot
current_bet
minimum_raise
version
created_at
updated_at
```

## game_private_state

Server-only data:

```text
deck
hole_cards
```

Jangan berikan akses direct client terhadap table private ini.

---

# 48. Action Log

Simpan action history:

```text
Alex calls 40
Nova raises to 120
You call 80
Pixel folds
```

UI tampilkan compact history.

---

# 49. Realtime Sync

Realtime sync harus mencakup:

- player join
- player leave
- ready
- chip amount
- current turn
- actions
- pot
- community cards
- street
- showdown
- result

Jangan broadcast private hole cards.

---

# 50. Race Condition Protection

Gunakan:

```text
gameVersion
```

Setiap action memiliki:

```text
actionId
expectedVersion
```

Example:

```ts
{
  actionId: crypto.randomUUID(),
  roomId,
  playerId,
  type: "call",
  expectedVersion: 42
}
```

Server reject stale state.

---

# 51. Idempotency

Action yang sama tidak boleh dieksekusi dua kali.

Simpan:

```text
actionId
```

dan reject duplicates.

---

# 52. Disconnect

Jika player disconnect:

Tampilkan:

```text
Alex disconnected
```

Gunakan reconnect window:

```text
60 seconds
```

Selama disconnect:

opsi room:

```text
Auto Check/Fold
```

Default:

```text
ON
```

Jika player bisa check:

```text
Check
```

Jika ada bet:

```text
Fold
```

---

# 53. Reconnect

Jika reconnect:

restore:

- seat
- chips
- own cards
- current game
- action status

Tampilkan:

```text
Reconnected
```

---

# 54. Turn Timer

Tambahkan timer per turn.

Example:

```text
20 seconds
```

atau:

```text
30 seconds
```

Jika timeout:

Jika Check tersedia:

```text
Auto Check
```

Jika tidak:

```text
Auto Fold
```

---

# 55. Turn Indicator

Player active:

```text
YOUR TURN
```

Gunakan ring/glow.

Opponent:

```text
Alex's Turn
```

Progress ring menunjukkan waktu tersisa.

---

# 56. Hand Result

Saat hand selesai:

Example:

```text
You Win

1,840 Chips

Two Pair
Aces and Kings
```

Highlight:

```text
[A♠][A♥][K♣][K♦][9♠]
```

---

# 57. Split Pot

Jika pemain tie:

pot dibagi sesuai aturan poker.

Contoh:

```text
Pot: 1200

Player A: +600
Player B: +600
```

Handle odd chip secara konsisten.

Dokumentasikan aturan odd chip.

---

# 58. Next Hand

Setelah result:

delay singkat.

Example:

```text
Next hand starts in 5...
```

Kemudian:

```text
dealer moves
↓
blinds move
↓
shuffle
↓
deal
```

---

# 59. Player Elimination

Jika chips = 0:

Untuk table match mode:

```text
ELIMINATED
```

Player menjadi spectator.

Atau jika game menggunakan refill play-money:

Buat setting:

```text
Auto Reset Chips
```

OFF secara default.

---

# 60. No Real-Money Economy

Semua chip hanya virtual score.

Secara eksplisit:

```text
Virtual chips have no monetary value.
```

Jangan menyediakan:

- wallet
- cash balance
- withdraw button
- bank transfer
- crypto wallet
- payment gateway
- cash prizes

---

# 61. Homepage

Hero:

```text
NEON POKER

PLAY YOUR HAND.
READ THE TABLE.
```

Subtitle:

```text
Play Texas Hold’em against bots or challenge friends in private multiplayer tables.
```

CTA:

```text
[Play Now]
[Practice vs Bots]
```

---

# 62. Game Mode Cards

### Practice vs Bots

```text
Sharpen your strategy against AI opponents.
```

### Private Table

```text
Create a room and invite your friends.
```

### Online Multiplayer

```text
Play at a table with other players.
```

---

# 63. Feature Section

```text
Why Neon Poker?
```

Cards:

```text
Real Texas Hold’em Rules
Smart AI Opponents
Private Multiplayer Tables
Mobile Friendly
Secure Hidden Cards
```

---

# 64. UI Style

Gunakan:

```text
rounded-xl
rounded-2xl
soft borders
glass-like panels
subtle gradients
clean typography
large action buttons
```

Jangan memenuhi game table dengan card UI yang tidak perlu.

---

# 65. Action Buttons

Primary actions:

```text
Fold
Check
Call
Bet
Raise
All-In
```

Gunakan visual hierarchy.

Misalnya:

Fold:

neutral / subtle red

Check:

blue

Call:

cyan

Raise:

purple

All-In:

orange

Pastikan accessible contrast.

---

# 66. Action Feedback

Tampilkan bubble:

```text
CHECK
```

```text
CALL 120
```

```text
RAISE 360
```

```text
ALL-IN 1,240
```

Bubble muncul singkat di dekat player seat.

---

# 67. Animations

Gunakan Framer Motion.

Animate:

- deal cards
- chips moving into pot
- fold
- community cards
- winner
- turn transition
- dealer button

Jangan berlebihan.

Target:

```text
150–400ms
```

untuk UI action biasa.

---

# 68. Sound

Optional sound:

- card deal
- check
- chips
- fold
- winner

Settings:

```text
Sound ON/OFF
```

Music:

optional dan OFF default.

---

# 69. Dealer Button

Tampilkan marker:

```text
D
```

Small blind:

```text
SB
```

Big blind:

```text
BB
```

Harus terlihat jelas.

---

# 70. Accessibility

Pastikan:

- keyboard usable
- aria-label
- focus state
- high contrast
- reduced motion
- touch target minimum sekitar 44px

Card suit tidak hanya dibedakan oleh warna.

---

# 71. Color Blind Support

Hearts dan Diamonds jangan hanya merah tanpa simbol.

Semua suit harus tetap dibedakan melalui:

```text
shape + label
```

Optional:

```text
4-color deck mode
```

Example:

```text
Spades: Black
Hearts: Red
Diamonds: Blue
Clubs: Green
```

---

# 72. Settings

Tambahkan:

```text
Sound
Animations
4-Color Deck
Reduced Motion
Show Action Log
Auto Check/Fold
Card Size
```

Simpan preferences di:

```text
localStorage
```

---

# 73. Error Handling

Handle:

```text
Room not found
Room full
Game already started
Not your turn
Invalid action
Insufficient chips
Invalid bet amount
Connection lost
Unable to join
Server synchronization error
```

Gunakan toast.

---

# 74. Loading States

Gunakan:

```text
Joining table...
```

```text
Creating table...
```

```text
Shuffling...
```

```text
Dealing cards...
```

```text
Waiting for players...
```

Jangan tampilkan blank screen.

---

# 75. Game Engine

Pisahkan pure game logic.

Contoh:

```text
createDeck()
shuffleDeck()
dealHoleCards()
postBlinds()
getValidActions()
applyAction()
createSidePots()
advanceStreet()
evaluateHands()
resolveShowdown()
splitPot()
rotateDealer()
```

---

# 76. Folder Structure

Example:

```text
app/
  page.tsx

  play/
    page.tsx

  bot/
    page.tsx

  online/
    page.tsx

  room/
    [roomId]/
      page.tsx

components/
  poker/
    PokerTable.tsx
    PlayingCard.tsx
    CommunityCards.tsx
    PlayerSeat.tsx
    PotDisplay.tsx
    PokerActions.tsx
    BetSlider.tsx
    DealerButton.tsx
    HandResult.tsx

  multiplayer/
    Lobby.tsx
    CreateRoom.tsx
    JoinRoom.tsx
    PlayerSlot.tsx
    ConnectionStatus.tsx

lib/
  poker/
    deck.ts
    shuffle.ts
    betting.ts
    evaluator.ts
    pots.ts
    engine.ts
    bot.ts

  multiplayer/
    realtime.ts
    rooms.ts

  supabase/
    client.ts
    server.ts

types/
  poker.ts
  player.ts
  room.ts
```

---

# 77. Routes

Minimal:

```text
/
```

Homepage.

```text
/bot
```

Play vs bots.

```text
/online
```

Online lobby.

```text
/room/[roomId]
```

Private room/table.

```text
/settings
```

Settings.

---

# 78. Tests

Gunakan:

```text
Vitest
```

Test minimal:

```text
deck contains 52 unique cards
shuffle preserves deck
dealer rotation
blinds
check
call
bet
raise
fold
all-in
minimum raise
street advancement
side pot calculation
showdown
tie
split pot
```

Hand evaluator tests:

```text
Royal Flush
Straight Flush
Four of a Kind
Full House
Flush
Straight
Three of a Kind
Two Pair
Pair
High Card
```

Tambahkan edge cases.

---

# 79. Multiplayer Tests

Test:

```text
wrong player cannot act
folded player cannot act
duplicate action rejected
stale version rejected
player cannot bet more chips than available
private cards cannot be retrieved by opponent
```

---

# 80. Security

Gunakan:

- schema validation
- server authorization
- RLS
- server-only game secrets
- secure shuffle
- rate limits jika perlu

Jangan expose:

```text
SUPABASE_SERVICE_ROLE_KEY
```

ke frontend.

`.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Service role hanya digunakan pada server.

---

# 81. PWA

Optional tetapi direkomendasikan.

Offline Practice vs Bots harus tetap dapat dimainkan setelah aset tersedia.

Tambahkan:

```text
manifest.webmanifest
service worker
app icons
offline fallback
```

---

# 82. SEO

Metadata:

```text
Title:
Neon Poker — Texas Hold’em Online & Offline

Description:
Play Texas Hold’em with friends or practice against smart AI opponents using virtual chips.
```

Tambahkan OpenGraph.

---

# 83. Vercel

Pastikan:

```bash
npm install
npm run dev
npm run test
npm run build
```

berjalan.

Deployment:

```text
GitHub
↓
Vercel
↓
Environment Variables
↓
Deploy
```

Tidak membutuhkan persistent custom server.

---

# 84. README

README harus menjelaskan:

```text
Project Overview
Tech Stack
Installation
Supabase Setup
Database Schema
RLS
Environment Variables
Local Development
Testing
Production Build
Vercel Deployment
```

---

# 85. Implementation Priority

Kerjakan dalam urutan:

```text
1. Card model
2. Deck
3. Secure shuffle
4. Hand evaluator
5. Betting rules
6. Pot system
7. Side pots
8. Street progression
9. Showdown
10. Poker table UI
11. Bot mode
12. Online room
13. Private card architecture
14. Server authority
15. Realtime
16. Reconnection
17. Mobile optimization
18. Animation
19. Audio
20. PWA and polish
```

Jangan mulai dari visual polish sebelum poker engine sudah stabil.

---

# 86. Final Quality Checklist

Pastikan:

```text
52-card deck works
shuffle works
2 hole cards/player
blinds work
dealer rotates
pre-flop works
flop works
turn works
river works
fold works
check works
call works
bet works
raise works
all-in works
side pots work
hand ranking works
tie works
split pots work
showdown works
bot mode works
private rooms work
hole cards remain private
reconnect works
responsive mobile works
production build works
```

---

# 87. Definition of Done

Game dianggap selesai jika user dapat:

```text
Open website
↓
Choose Play vs Bots
↓
Sit at table
↓
Receive cards
↓
Play full Texas Hold’em hand
↓
Bet / Call / Raise / Fold
↓
Reach showdown
↓
Winner determined correctly
↓
Start another hand
```

Online:

```text
Player A creates room
↓
Player B joins
↓
Both sit at same table
↓
Each only sees own hole cards
↓
Actions synchronize
↓
Community cards synchronize
↓
Pot calculated correctly
↓
Showdown resolves
↓
Next hand starts
```

Semua chip hanyalah **virtual play-money points tanpa nilai moneter**.

Jika terdapat keputusan teknis yang tidak dijelaskan, pilih implementasi yang:

```text
secure
maintainable
server-authoritative
mobile-friendly
Vercel-compatible
```

Prioritaskan:

```text
rule correctness
hidden-card security
multiplayer integrity
performance
responsive UX
```

dibanding fitur dekoratif.

Untuk game poker, tiga bagian yang paling penting untuk jangan dilewatkan adalah **hand evaluator yang akurat**, **side-pot/all-in calculation**, dan **hole-card security** pada multiplayer. Ketiganya sebaiknya dites cukup ketat sebelum fokus ke animasi atau polish UI.