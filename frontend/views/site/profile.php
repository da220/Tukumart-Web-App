<?php

/** @var \common\models\User $user */
/** @var \common\models\UserAddress $userAddresses */
/** @var \yii\web\View $this */

use yii\bootstrap5\ActiveForm;
use yii\bootstrap5\Html;

?>

<div class="row">
<div class="col">
        <div class="card">
            <div class="card-header">
                Address information
            </div>
            <div class="card-body">

                <?php \yii\widgets\Pjax::begin([
                    'enablePushState' => false
                ]) ?>
                <?php echo $this->render('user_address', [
                    'userAddress' => $userAddress
                ]) ?>
                <?php \yii\widgets\Pjax::end() ?>
            </div>
        </div>
    </div>

    <div class="col">
        <div class="card">
            <div class="card-header">
                Account information
            </div>
            <div class="card-body">
                <?php \yii\widgets\Pjax::begin([
                    'enablePushState' => false
                ]) ?>
                <?php echo $this->render('user_account', [
                    'user' => $user
                ]) ?>
                <?php \yii\widgets\Pjax::end() ?>
            </div>
        </div>
</div>
