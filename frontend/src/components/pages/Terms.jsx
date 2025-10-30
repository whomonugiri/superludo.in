import { useSelector } from "react-redux";
import { Card } from "../elements/Card";
import { useTranslation } from "react-i18next";
import toastr from "toastr";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import Button1 from "../elements/Button1";
import { MdContentCopy } from "react-icons/md";
import {
  API_FETCH_REFERRAL_DATA,
  API_HOST,
  CLIENT,
} from "../../utils/constants";
import { FaWhatsapp } from "react-icons/fa6";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Terms = () => {
  const { isAuth, refCode, referralCommisionLevel1, referralCommisionLevel2 } =
    useSelector((store) => store.auth);

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {}, []);
  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <div
          className="accordion rounded border mt-3 bg-light"
          id="legalAccordion"
        >
          {accordionData.map((item, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header" id={`heading-${index}`}>
                <button
                  className={`accordion-button bg-danger fw-bold text-white collapsed`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                  // aria-expanded={index === 0}
                  aria-controls={`collapse-${index}`}
                >
                  {item.title}
                </button>
              </h2>
              <div
                id={`collapse-${index}`}
                className={`accordion-collapse collapse `}
                data-bs-parent="#legalAccordion"
              >
                <div
                  className="accordion-body p-2"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

const accordionData = [
  {
    title: "Platform Commission",
    content: `
      <p><strong>Super Ludo</strong> charges a minimal platform commission on every contest. This helps us maintain fair play and provide uninterrupted service to our users.</p>
      <p>Commission details are transparently shown before you join any match.</p>
    `,
  },
  {
    title: "Terms & Conditions",
    content: `
      <div class="container my-4">
  <h2>Super Ludo - Terms and Conditions</h2>
  <p>
    These terms and conditions of use (“Terms”) along with our Privacy Policy form a legally binding agreement (“Agreement”) between you (“User”) and us ("Super Ludo") operating at <a href="https://superludo.in" target="_blank">https://superludo.in</a>.
  </p>
  <p>
    Please read these Terms and the Privacy Policy carefully. If you have any questions, contact us and we will be happy to help.
  </p>

  <hr>

  <h4>A. USER APPROVAL</h4>
  <ol>
    <li>
      By using the Super Ludo app or platform, you accept and agree to this Agreement by:
      <ul>
        <li>Reading all terms and conditions</li>
        <li>Reading and understanding all rules of the app</li>
      </ul>
    </li>
    <li>
      You may accept and use the platform only if:
      <ul>
        <li>You are a natural person aged 18 years or older with legal capacity</li>
        <li>You are <strong>not</strong> a resident of Tamil Nadu, Andhra Pradesh, Telangana, Assam, Odisha, Sikkim, or Nagaland</li>
        <li>You are authorized under Indian law to enter into contracts</li>
        <li>You are not legally restricted from using the platform</li>
      </ul>
    </li>
    <li>Do <strong>not</strong> use the app if you do not understand or agree to the Terms.</li>
    <li>If you have a separate written agreement with us, that agreement overrides these Terms in case of a conflict.</li>
  </ol>

  <hr>

  <h4>B. PROVISION OF THE APP</h4>
  <ol>
    <li>
      Under Section 12 of the Public Gambling Act, 1867, games of skill are exempt from gambling restrictions.
    </li>
    <li>
      Super Ludo offers <strong>games of skill</strong> (like Ludo). We do <strong>not</strong> support games of chance for money.
    </li>
    <li>
      Users from the following states and outside India are <strong>prohibited</strong> from using our platform:
      <strong>Tamil Nadu, Andhra Pradesh, Telangana, Assam, Odisha, Sikkim, Nagaland</strong>.
    </li>
    <li>
      Game rules are clearly defined in the platform. Please read and understand them before playing.
    </li>
    <li>
      Game outcomes are based on your skill, decision-making, and timing.
    </li>
    <li>
      Some elements of chance exist for excitement, but success depends on skill.
    </li>
    <li>
      With experience and practice, your performance can improve over time.
    </li>
    <li>
      Pre-determined outcomes (like dice in Ludo) can be influenced using strategy and knowledge.
    </li>
  </ol>

  <hr>

  <h4>C. GAME RULES</h4>
  <ol>
    <li>Users <strong>must record every game</strong>. If you face cheating or hacking, submit your recording to support.</li>
    <li>If the game did not start and you made <strong>no move</strong>, it can be cancelled only if you have a video recording.</li>
    <li>No proof = No action. Reports without video evidence will be treated as a <strong>loss</strong>.</li>
    <li>If you have not moved or opened a pawn, your game may be eligible for cancellation.</li>
    <li>If the opponent leaves the game early and has no valid proof, <strong>you will win</strong>.</li>
  </ol>

  <hr>

  <h4>D. DEPOSIT / WITHDRAWAL</h4>
  <ol>
    <li>Users can deposit money using the <strong>Buy Chips</strong> section in the app.</li>
    <li>
      <strong>Important:</strong> If we detect any suspicious activity or transactions, your account may be <strong>temporarily blocked</strong>. Contact the admin with proper details to resolve the issue.
    </li>
    <li>Withdrawals can be requested via the <strong>Sell Request</strong> option in the app.</li>
    <li>All deposits and withdrawals are manually handled by the support team.</li>
    <li>Incorrect payment information is your responsibility — <strong>no refund</strong> will be processed in such cases.</li>
    <li>Once a withdrawal is completed, you <strong>cannot raise a dispute</strong>.</li>
    <li>If your withdrawal is marked as pending, please wait <strong>1 to 5 business days</strong>.</li>
  </ol>

  <hr>

  <p>
    By continuing to use <strong>Super Ludo</strong>, you acknowledge and agree to these Terms. Any misuse or violation of the Terms may result in account suspension or ban.
  </p>

  <p>
    For questions or support, email us at <a href="mailto:support@superludo.in">support@superludo.in</a> or visit our <a href="https://superludo.in/chat" target="_blank">Contact Page</a>.
  </p>
</div>

    `,
  },
  {
    title: "Cancellation & Refund Policy",
    content: `
      <p>Entry fees are <strong>non-refundable</strong> once a game has started.</p>
      <p>In case of a technical error or server issue, the match may be cancelled and the entry amount will be refunded to your Super Ludo wallet.</p>
      
       
      <a href="chat" class="btn btn-sm btn-outline-primary mt-2">Contact Support</button>
      
    `,
  },
  {
    title: "Responsible Gaming",
    content: `
      <div class="container my-4">
  <h2 class="mb-3">Our Mission Statement</h2>
  <p>
    At <strong>Super Ludo</strong>, we are committed to promoting <strong>responsible play</strong>. We encourage players to enjoy skill-based gaming as a form of entertainment, and support those who wish to take a break or set limits on their gameplay.
  </p>

  <hr>

  <h4>Ensuring Responsible Play</h4>
  <ul>
    <li>Only individuals aged <strong>18 years and above</strong> can participate in real money skill games.</li>
    <li>Players may request <strong>temporary self-exclusion</strong> from their accounts if needed.</li>
    <li>We recommend following our <strong>Guide to Responsible Play</strong> to monitor gaming behavior.</li>
  </ul>

  <hr>

  <h4>Guide to Responsible Play</h4>
  <p>
    Sometimes, players may not realize when their gaming behavior becomes excessive. It's natural to minimize or deny such habits — even if they affect your finances, health, or relationships.
  </p>
  <p>Here are some best practices for playing responsibly:</p>
  <ul>
    <li>Play for <strong>entertainment</strong>, not to make money or escape problems.</li>
    <li>Do not chase your losses.</li>
    <li>Set a clear entertainment <strong>budget</strong> and stick to it.</li>
    <li>Monitor how much <strong>time and money</strong> you spend on games.</li>
    <li>Use the <strong>Add Cash Limit</strong> feature to control spending.</li>
    <li>Balance gaming with other hobbies and activities.</li>
  </ul>

  <hr>

  <h4>Signs You May Not Be Playing Responsibly</h4>
  <p>If you answer “yes” to any of the following questions, you may need help:</p>
  <ul>
    <li>Do you spend more money or time than intended while playing?</li>
    <li>Do you feel <strong>guilty, ashamed</strong>, or anxious about your gaming?</li>
    <li>Do you try to win back losses?</li>
    <li>Have you missed important events due to gaming?</li>
    <li>Is gaming affecting your work, relationships, or mental health?</li>
    <li>Have you lied or borrowed money to continue playing?</li>
    <li>Have you experienced <strong>stress, depression, or panic attacks</strong> due to gaming?</li>
  </ul>

  <hr>

  <h4>What is Game Prudence?</h4>
  <p>
    <strong>Game Prudence</strong> is an independent, non-judgmental organization that supports healthy gaming habits for players on skill-based gaming platforms. They offer:
  </p>
  <ul>
    <li>Free, confidential psychological counseling</li>
    <li>Expert guidance certified by iGaming Academy</li>
    <li>Private evaluation of your gaming habits</li>
  </ul>
  <p><strong>To learn more, visit:</strong> <a href="https://www.gameprudence.com" target="_blank">www.gameprudence.com</a></p>

  <hr>

  <h4>Need Help?</h4>
  <p>
    If you or someone you know is struggling with responsible play, please <strong>seek help immediately</strong>.
  </p>
  <a href="https://www.gameprudence.com/contact" class="btn btn-danger btn-sm" target="_blank">
    Get Help from Game Prudence
  </a>
</div>
    `,
  },
  {
    title: "TDS Policy",
    content: `
     <div class="container my-4">
  <h2 class="mb-3">TDS Policy – Effective from April 1, 2023</h2>
  <p>
    In line with the <strong>Finance Act, 2023</strong>, the following <strong>Tax Deducted at Source (TDS)</strong> policy is applicable for all players on <strong>Super Ludo</strong> from <strong>April 1, 2023</strong>.
  </p>

  <hr>

  <h4>When is TDS Applicable?</h4>
  <ul>
    <li>TDS is applied at the time of <strong>withdrawal</strong> or <strong>deposit refund</strong>.</li>
    <li><strong>30% TDS</strong> is deducted on any <strong>positive net winnings</strong> during a withdrawal.</li>
    <li>At the <strong>end of the financial year</strong>, TDS will be applied on the wallet balance, treating it as a withdrawal.</li>
    <li>The remaining balance post-TDS will be carried forward to the next financial year as a <strong>deposit balance</strong> (not taxable next year).</li>
  </ul>

  <p><strong>Financial Year:</strong> April 1 to March 31</p>
  <p><strong>Net Winnings Formula:</strong> <code>Total Withdrawals - Total Deposits</code></p>

  <hr>

  <h4>Previous Policy (Before April 1, 2023)</h4>
  <p>
    TDS was deducted <strong>per game</strong> if winnings exceeded ₹10,000. For example:
  </p>
  <ul>
    <li>Winnings = ₹11,000</li>
    <li>30% TDS = ₹3,300</li>
    <li><strong>Net Credited:</strong> ₹7,700</li>
  </ul>

  <hr>

  <h4>Current Policy (From April 1, 2023)</h4>
  <ul>
    <li>No TDS is deducted at the time of game winnings.</li>
    <li>The full winning amount is credited to your wallet.</li>
    <li>TDS is calculated only when <strong>net winnings &gt; 0</strong> and you withdraw.</li>
    <li>If <strong>net winnings ≤ 0</strong>, no TDS is deducted — beneficial for users!</li>
  </ul>

  <div class="alert alert-warning">
    <strong>Note:</strong> This policy is based on Finance Act, 2023. Super Ludo reserves the right to modify the policy as per legal requirements.
  </div>

  <hr>

  <h4>🧮 Scenario 1: Net Winnings More Than Zero</h4>
  <p><strong>Example:</strong></p>
  <ul>
    <li>Total Withdrawals (A): ₹5,000</li>
    <li>Total Deposits (B): ₹10,000</li>
    <li>Withdrawal Attempt (C): ₹7,000</li>
  </ul>
  <p><strong>Net Winnings = A + C - B = ₹2,000</strong></p>
  <p><strong>TDS (30%) = ₹600</strong></p>
  <p><strong>Amount Credited to Bank = ₹6,400</strong></p>

  <div class="alert alert-success">
    💡 <strong>No TDS</strong> is deducted if you only withdraw ₹5,000:
    <br>
    Net Winnings = 5,000 + 5,000 - 10,000 = ₹0
  </div>

  <hr>

  <h4>🧮 Scenario 2: TDS Already Paid in Previous Withdrawals</h4>
  <p><strong>Example:</strong></p>
  <ul>
    <li>Total Withdrawals: ₹20,000</li>
    <li>Total Deposits: ₹20,000</li>
    <li>TDS Already Paid (on ₹6,000 winnings): ₹1,800</li>
  </ul>
  <p>
    In this case, you won't be charged TDS again unless your net winnings exceed ₹6,000.
  </p>

  <ul>
    <li>Withdraw ₹6,000 → <strong>No TDS</strong></li>
    <li>Withdraw ₹10,000 → TDS applicable only on ₹4,000 = ₹1,200</li>
  </ul>

  <hr>

  <h4>Important Year-End Policy</h4>
  <ul>
    <li>Year-end wallet balance is treated as a withdrawal for TDS purposes.</li>
    <li>After deducting TDS (if applicable), remaining amount will be carried forward.</li>
    <li>This carried amount will be considered a <strong>deposit</strong> for the next financial year and will <strong>not be taxed again</strong>.</li>
    <li>However, amounts in ongoing games (on-table) at year-end <strong>will not</strong> be carried forward.</li>
  </ul>

  <hr>

  <p class="text-muted">
    For queries or clarifications, please contact support at <a href="mailto:support@superludo.in">support@superludo.in</a> or visit our <a href="https://superludo.in/chat" target="_blank">Contact Page</a>.
  </p>
</div>
  
    `,
  },
  {
    title: "GST Policy",
    content: `
        <div class="container py-4">
    <p>
      <strong>From 1st October 2023</strong>, New <strong>28%</strong> Government Tax (GST) is applicable on the deposits.
    </p>

    <h5 class="fw-bold mt-4">Let's understand the new GST regime..</h5>

    <p>
      If a player deposits <strong>Rs.100</strong> to play a game, there will be inclusive <strong>28% GST</strong> levied
      on the deposit amount, and the user will need to complete a transaction of <strong>Rs.100</strong>
      (Rs. 78.13 + 28% of Rs. 78.13). Thus, Rs. 100 will be settled in the user’s deposit wallet and the Rs. 21.88 will
      be accounted for GST paid. Exact <strong>GST amount</strong> will be credited into user Bonus wallet. The details
      of GST paid by the user can be viewed in the View Transactions on the application.
    </p>

    <div class="card mt-4">
      <div class="card-header fw-bold">Example</div>
      <div class="card-body">
        <div class="d-flex justify-content-between mb-2">
          <span class="small">Deposit Amount (Excl. Govt. Tax) <span class="badge bg-danger">A</span></span>
          <span>₹ 78.13</span>
        </div>

        <div class="d-flex justify-content-between mb-2">
          <span>Govt. Tax (28% GST)</span>
          <span>₹ 21.88</span>
        </div>

        <hr />

        <div class="d-flex justify-content-between fw-bold mb-2">
          <span>Total</span>
          <span>₹ 100</span>
        </div>

        <div class="d-flex justify-content-between mb-2">
          <span>
            Deposit Bonus 🎁 <span class="badge bg-warning text-dark">B</span>
          </span>
          <span>₹ 21.88</span>
        </div>

        <hr />

        <div class="d-flex justify-content-between fw-bold fs-6">
          <span>
            Add To Wallet Balance 
            <span class="badge bg-danger">A</span> + 
            <span class="badge bg-warning text-dark">B</span>
          </span>
          <span class="text-success">₹ 100</span>
        </div>
      </div>
    </div>
  </div>
    `,
  },
  {
    title: "Privacy Policy",
    content: `
      <div class="container my-4">
  <h2 class="mb-3">Privacy Policy</h2>
  <p>
    This Privacy Policy explains how <strong>Super Ludo</strong> (https://superludo.in) collects, uses, stores, and shares your personal information. By accessing or using our services, you agree to the terms of this policy. If you disagree with any part, please do not use the platform.
  </p>

  <hr>

  <h4>I. Information We Collect</h4>
  <p>We may collect and process the following types of data:</p>
  <ul>
    <li>Details provided during account registration</li>
    <li>Usage data and interactions on our platform</li>
    <li>Communication with our support team</li>
    <li>Information from cookies or analytics services</li>
    <li>Information provided via social media integrations</li>
  </ul>

  <h5>Personal Data Includes:</h5>
  <ul>
    <li>Email address</li>
    <li>Full name</li>
    <li>Phone number</li>
    <li>Location (address, city, postal code, etc.)</li>
  </ul>

  <hr>

  <h4>II. Cookies</h4>
  <p>
    We use cookies and similar technologies for enhancing user experience, tracking user preferences, processing payments, and improving services. You can manage cookies via your browser settings, but disabling them may limit some features.
  </p>

  <hr>

  <h4>III. Location Data</h4>
  <p>
    If you allow location sharing, Super Ludo may use it to offer location-specific services or personalization.
  </p>

  <hr>

  <h4>IV. Log Data</h4>
  <p>
    Our servers automatically collect technical information like IP address, browser type, device ID, pages visited, etc., for analytics and platform improvement.
  </p>

  <hr>

  <h4>V. Payments</h4>
  <p>
    When you make a payment, we collect billing data as required. Payments processed by third-party services are governed by their respective privacy policies.
  </p>

  <hr>

  <h4>VI. Third-Party Services</h4>
  <p>
    We may use third-party services like Google, YouTube, and analytics tools. These services may collect data as per their terms:
    <br>
    - <a href="https://www.youtube.com/t/terms" target="_blank">YouTube Terms</a><br>
    - <a href="https://policies.google.com/privacy" target="_blank">Google Privacy Policy</a><br>
    - <a href="https://myaccount.google.com/permissions" target="_blank">Manage Your Google Permissions</a>
  </p>

  <hr>

  <h4>VII. Customer Support</h4>
  <p>
    We collect and store details you provide while contacting support, including gameplay data and communication logs, to assist you better.
  </p>

  <hr>

  <h4>VIII. Use of Your Information</h4>
  <p>We use your data for the following purposes:</p>
  <ul>
    <li>Managing your account</li>
    <li>Sending updates and promotional offers</li>
    <li>Improving our platform and services</li>
    <li>Personalizing content and gameplay</li>
    <li>Legal compliance and fraud prevention</li>
  </ul>

  <hr>

  <h4>IX. Sharing and Disclosure</h4>
  <p>
    We only share your information as necessary to operate the platform, such as with payment providers, business partners, or legally authorized entities. Anonymous and aggregated data may be shared for research or analysis.
  </p>

  <hr>

  <h4>X. Social Media Integration</h4>
  <p>
    By connecting your social accounts (Facebook, WhatsApp, etc.), you allow us to share data like your name and profile picture. Review third-party platforms’ policies before connecting.
  </p>

  <hr>

  <h4>XI. Retention and Data Protection</h4>
  <p>
    Your data is stored securely and retained only for as long as needed to fulfill services or comply with laws. We implement reasonable safeguards but cannot guarantee 100% protection against breaches.
  </p>

  <hr>

  <h4>XII. Children’s Privacy</h4>
  <p>
    Our services are strictly for users above 18 years. If we find any account linked to a minor, it will be terminated and related data will be deleted. Please contact us if you suspect any underage use.
  </p>

  <hr>

  <h4>XIII. Legal Compliance</h4>
  <p>
    We may disclose your information if required by law, regulation, or legal proceedings. You have the right to update or delete your data using your account settings or by contacting us.
  </p>

  <hr>

  <h4>XIV. Jurisdiction</h4>
  <p>
    This Privacy Policy is governed by the laws of India. Any dispute will be subject to the jurisdiction of courts in Jaipur, Rajasthan, India.
  </p>

  <hr>

  <h4>XV. Updates</h4>
  <p>
    We may update this Privacy Policy from time to time. Continued use of our services constitutes your acceptance of the revised policy.
  </p>

  <hr>

  <p>
    For any questions, contact us at: <a href="mailto:support@superludo.in">support@superludo.in</a>
  </p>
</div>
    `,
  },
  {
    title: "About Us",
    content: `
      <p>We are an HTML5 game-publishing company and our mission is to make accessing games fast and easy by removing the friction of app-installs.</p>

<p><b>Super Ludo</b> is a skill-based real-money gaming platform accessible only for our users in India. It is accessible on https://superludo.com. On Super Ludo, users can compete for real cash in Tournaments and Battles. They can encash their winnings via popular options such as Paytm Wallet, UPI or Phonepe.</p>
      <p>Built for Indian users. 100% legal. 100% desi.</p>
    `,
  },
  {
    title: "Grievance Redressal",
    content: `
      <p>If you have any complaints, please reach out to our <strong>Grievance Officer</strong> at:</p>
      <p><strong>Email:</strong> <a href="mailto:grievance@superludo.in">grievance@superludo.in</a></p>
      <p>We aim to resolve issues within <strong>48 hours</strong>.</p>
    `,
  },
  {
    title: "Contact Us",
    content: `
      <p>Need help? We're here for you.</p>
      <p><strong>Email:</strong> <a href="mailto:support@superludo.in">support@superludo.in</a><br/>
        
      <a href="chat" target="_blank" class="btn btn-sm btn-primary mt-2">Visit Contact Page</a>
    `,
  },
];
