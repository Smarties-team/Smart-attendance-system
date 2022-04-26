<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students_logs', function (Blueprint $table) {
            $table->unsignedBigInteger('student_id');
            $table->timestamp('entered_at');
            $table->timestamp('left_at')->nullable();
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('students')
                ->onDelete('cascade');
            $table->primary(['student_id', 'entered_at']);
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students_logs');
    }
}
