<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Facture Ordinateur Portable #{{ $facture->id_facture_lap }}</title>
    <style>
        body {
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #fff;
            color: #000000;
            font-size: 14px;
            line-height: 1.6;
        }

        .invoice-box {
            max-width: 800px;
            margin: 0px auto;
            padding: 10px;
            background: #fff;
            -webkit-print-color-adjust: exact; /* For better print output */
        }

        .header-section {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #eee;
        }

        .company-info {
            text-align: left;
        }

        .company-name {
            font-size: 26px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }

        .invoice-info {
            text-align: center;
        }

        .invoice-title {
            font-size: 30px;
            font-weight: bold;
            color: #000000;
            margin-bottom: 10px;
        }

        .invoice-details p {
            margin: 0;
            padding: 2px 0;
        }

        .section {
            margin-bottom: 25px;
            border: 1px solid #f0f0f0;
            border-radius: 5px;
            overflow: hidden; /* Ensures borders are contained */
        }

        .section-title {
            background-color: #f9f9f9;
            padding: 12px 20px;
            font-size: 16px;
            font-weight: bold;
            color: #000000;
            border-bottom: 1px solid #f0f0f0;
        }

        .section-content {
            padding: 15px 20px;
            font-weight: bold;
        }

        .info-row {
            display: flex;
            margin-bottom: 8px;
        }

        .info-label {
            font-weight: bold;
            width: 120px;
            min-width: 120px;
            color: #444;
        }

        .info-value {
            flex-grow: 1;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        table thead th {
            background-color: #f9f9f9;
            padding: 12px 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
            color: #000000;
        }

        table tbody td {
            padding: 10px;
            border-bottom: 1px solid #eee;
            vertical-align: top;
        }

        table tbody tr:last-child td {
            border-bottom: none;
        }

        .total-section {
            margin-top: 30px;
            text-align: right;
            padding-top: 20px;
            border-top: 2px solid #eee;
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }

        .total-amount {
            font-size: 25px;
            color: #000000; /* A prominent color for the total */
            margin-top: 10px;
        }
    </style>
</head>
<body>
<div class="invoice-box">
    <div class="header-section">
        <div class="company-info">
            <div class="company-name">H&M Computer</div>
            <p>Cité Boushaki, Bab Ezzouar</p>
            <p>Téléphone: +213 770547238</p>
        </div>
        <div class="invoice-info">
            <div class="invoice-title text-center">Bon de Livraison</div>
            <div class="invoice-details">
                <p><strong>Date:</strong> {{ \Carbon\Carbon::parse($facture->date_facture_lap)->format('d/m/Y') }}</p>
            </div>
        </div>
    </div>

    <div class="section client-section">
        <div class="section-title">Informations Client</div>
        <div class="section-content">
            <div class="info-row">
                <span class="info-label">Nom:</span>
                <span class="info-value">{{ $facture->client->nom_client }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Téléphone:</span>
                <span class="info-value">{{ $facture->client->num_tel_client }}</span>
            </div>
        </div>
    </div>

    <div class="section laptop-section">
        <div class="section-title">Détails de l'Ordinateur Portable</div>
        <div class="section-content">
            <table>
                <thead>
                <tr>
                    <th>Marque</th>
                    <th>Modèle</th>
                    <th>Caractéristiques</th>
                    <th style="text-align: right;">Prix</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{{ $facture->laptop->marque_lap }}</td>
                    <td>{{ $facture->laptop->nom_lap }}</td>
                    <td>{{ $facture->laptop->desc_lap }}</td>
                    <td style="text-align: right;">{{ number_format($facture->laptop->prix_vente_lap, 2) }} DA</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="total-section">
        <p>Montant Total:</p>
        <div class="total-amount">{{ number_format($facture->montant_facture_lap, 2) }} DA</div>
    </div>
</div>
</body>
</html>
